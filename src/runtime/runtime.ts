import * as memory from "./memory";
import * as scheduler from "./scheduler";
import Palette from "../systems/video/palette";

const Scheduler = scheduler.Scheduler;
const MemoryManager = memory.MemoryManager;

function Environment() {
  this.video = {
    width: 320,
    height: 200,
  };
}

// TODO: Runtime should be passed with a light version of the memory map,
// enough to be able of allocating the needed memory.
function Runtime(processMap, memorySymbols) {
  this._ondebug = null;
  this._onfinished = null;
  this._systems = [];
  this._systemMap = {};
  this._memoryManager = new MemoryManager(memorySymbols);
  this._environment = new Environment();
  const memory = this._memoryManager.getMemory();
  this._scheduler = new Scheduler(memory, processMap, {
    onyield: this._schedule.bind(this),
    // XXX: Update means after all processes have run entirely
    onupdate: this._runSystems.bind(this),
  });
}

Runtime.prototype = {
  constructor: Runtime,

  registerSystem: function (system, name) {
    if (name && typeof this._systemMap[name] !== "undefined") {
      throw new Error("System already registered with name: " + name);
    }
    system.initialize();
    this._systems.push(system);
    if (name) {
      this._systemMap[name] = system;
    }
  },

  getSystem: function (name) {
    return this._systemMap[name];
  },

  getMemoryBrowser: function () {
    return this._memoryManager.getBrowser();
  },

  set onfinished(callback) {
    this._onfinished = callback;
    if (this._scheduler instanceof scheduler.Scheduler) {
      this._scheduler.onfinished = this._onfinished.bind(this);
    }
  },

  get onfinished() {
    return this._onfinished;
  },

  set ondebug(callback) {
    this._ondebug = callback;
    if (this._scheduler instanceof scheduler.Scheduler) {
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
    this._scheduler.addProgram(id);
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
    // XXX: Notice resume is run right now.
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
    this._scheduler.addProcess(name, id);
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
          currentExecution.retv.enqueue(0);
        }
      });
    this._scheduler.addBlockingFunction(work);
  },

  _frame: function (baton) {},

  // TODO: Consider passing the id through the baton
  _end: function (baton) {
    const currentProcessId = this._scheduler.currentExecution.id;
    this._memoryManager.freeProcess(currentProcessId);
    this._scheduler.deleteCurrent();
  },
};

const Baton = scheduler.Baton;

export { Runtime, Baton };
