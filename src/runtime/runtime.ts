import { MemoryManager } from "./memory";
import { Scheduler, Baton, Runnable } from "./scheduler";
import Palette from "../systems/video/palette";

class ProcessEnvironment implements Runnable {
  pc: number;
  runnable: CallableFunction;
  id: number;
  base: number;
  retv: ReturnValuesQueue;
  dead: boolean;
  memory: any;

  constructor(runnable, base, memory) {
    this.pc = 1;
    this.runnable = runnable;
    this.id = base;
    this.base = base;
    this.retv = new ReturnValuesQueue();
    this.dead = false;
    this.memory = memory;
  }

  run() {
    return this.runnable(this.memory, this);
  }
}

class ReturnValuesQueue {
  private _data: Array<any>;

  constructor() {
    this._data = [];
  }

  enqueue(value: any) {
    this._data.push(value);
  }

  dequeue() {
    return this._data.shift();
  }
}

function Environment() {
  this.video = {
    width: 320,
    height: 200,
  };
}

// TODO: Runtime should be passed with a light version of the memory map,
// enough to be able of allocating the needed memory.
function Runtime(processMap, memorySymbols) {
  this._onerror = null;
  this._ondebug = null;
  this._onfinished = null;
  this._systems = [];
  this._systemMap = {};
  this._memoryManager = new MemoryManager(memorySymbols);
  this._environment = new Environment();
  this._pmap = processMap;
  this._mem = this._memoryManager.getMemory();
  this._scheduler = new Scheduler({
    onyield: this._schedule.bind(this),
    // XXX: Update means after all processes have run entirely
    onupdate: this._runSystems.bind(this),
  });
}

Runtime.prototype = {
  constructor: Runtime,

  addProcess(name: string, base: number) {
    const runnable = this._pmap["process_" + name];
    const processEnvironment = new ProcessEnvironment(
      runnable,
      base,
      this._mem
    );
    this._scheduler.add(processEnvironment);
  },

  addProgram(base: number) {
    const runnable = this._pmap["program"];
    const processEnvironment = new ProcessEnvironment(
      runnable,
      base,
      this._mem
    );
    this._scheduler.add(processEnvironment);
  },

  registerSystem: function (system, name: string) {
    if (name && typeof this._systemMap[name] !== "undefined") {
      throw new Error("System already registered with name: " + name);
    }
    system.initialize();
    this._systems.push(system);
    this._systemMap[name] = system;
  },

  getSystem: function (name) {
    return this._systemMap[name];
  },

  getMemoryBrowser: function () {
    return this._memoryManager.getBrowser();
  },

  set onerror(callback) {
    this._onerror = callback;
    if (this._scheduler instanceof Scheduler) {
      this._scheduler.onerror = this._onerror.bind(this);
    }
  },

  get onerror() {
    return this._onerror;
  },

  set onfinished(callback) {
    this._onfinished = callback;
    if (this._scheduler instanceof Scheduler) {
      this._scheduler.onfinished = this._onfinished.bind(this);
    }
  },

  get onfinished() {
    return this._onfinished;
  },

  set ondebug(callback) {
    this._ondebug = callback;
    if (this._scheduler instanceof Scheduler) {
      this._scheduler.ondebug = this._ondebug;
    }
  },

  get ondebug() {
    return this._ondebug;
  },

  run: function () {
    this._scheduler.reset();
    this._memoryManager.reset();
    const id = this._memoryManager.allocateProcess();
    this.addProgram(id);
    // XXX: Load defaults
    this._loadDefaultPalette();
    this._scheduler.run();
  },

  _runSystems: function () {
    const memoryBrowser = this.getMemoryBrowser();
    const environment = this._environment;
    this._systems.forEach(function (system) {
      system.run(memoryBrowser, environment);
    });
  },

  _schedule: function (baton) {
    const name = "_" + baton.type;
    if (!(name in this)) {
      throw Error("Unknown execution message: " + baton.type);
    }
    return this[name](baton);
  },

  _debug: function (baton) {
    this._scheduler.onpause = this._startDebug.bind(this);
    this._scheduler.pause();
  },

  _startDebug: function () {
    // XXX: Notice resume === run() right now!
    this._ondebug({
      resume: this._scheduler.run.bind(this._scheduler),
      stop: this._scheduler.stop.bind(this._scheduler),
    });
  },

  _newprocess: function (baton) {
    const name = baton.processName;
    const id = this._memoryManager.allocateProcess();
    if (!id) {
      throw new Error("Max number of process reached!");
    }
    this.addProcess(name, id);
  },

  _call: function (baton) {
    const functionName = baton.functionName;
    if (functionName === "put_pixel") {
      const [x, y, colorIndex] = baton.args;
      this.getSystem("video").screen.putPixel(x, y, colorIndex);
      // XXX: put_pixel returns the x value. Checked empirically.
      this._scheduler.currentExecution.retv.enqueue(x);
    }
    if (functionName === "rand") {
      const [min, max] = baton.args;
      const result = Math.floor(Math.random() * (max - min + 1)) + min;
      this._scheduler.currentExecution.retv.enqueue(result);
    }
    if (functionName === "load_pal") {
      const [palettePath] = baton.args;
      this._loadPal(palettePath);
    }
  },

  _loadDefaultPalette: function () {
    this._loadPal("PAL/DIV2.PAL", { discardReturnValue: true });
  },

  _loadPal(palettePath, { discardReturnValue = false } = {}) {
    const currentExecution = this._scheduler.currentExecution;
    const work = this.getSystem("files")
      .loadPal(palettePath)
      .then((palFile) => {
        this.getSystem("video").setPalette(Palette.fromBuffer(palFile.buffer));
        if (!discardReturnValue) {
          currentExecution.retv.enqueue(1);
        }
      })
      .catch(function (error) {
        throw error;
      });
    this._scheduler.addBlockingFunction(work);
  },

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _frame: function (baton) {},

  // TODO: Consider passing the id through the baton
  _end: function (baton) {
    const currentProcessId = this._scheduler.currentExecution.id;
    this._memoryManager.freeProcess(currentProcessId);
    this._scheduler.deleteCurrent();
  },
};

export { Runtime, Baton };
