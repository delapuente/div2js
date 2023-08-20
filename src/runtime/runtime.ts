import { MemoryManager } from "./memory";
import { Scheduler, Baton, Process } from "./scheduler";
import { load_pal } from "../builtins";

class ProcessImpl implements Process {
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
  this._functions = {};
  this._memoryManager = new MemoryManager(memorySymbols);
  this._environment = new Environment();
  this._pmap = processMap;
  this._mem = this._memoryManager.rawMemory;
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
    const processEnvironment = new ProcessImpl(runnable, base, this._mem);
    this._scheduler.add(processEnvironment);
  },

  addProgram(base: number) {
    const runnable = this._pmap["program"];
    const processEnvironment = new ProcessImpl(runnable, base, this._mem);
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

  registerFunction: function (fn: CallableFunction, name: string) {
    if (name && typeof this._functions[name] !== "undefined") {
      throw new Error("Function already registered with name: " + name);
    }
    this._functions[name] = fn;
  },

  getSystem: function (name) {
    return this._systemMap[name];
  },

  getMemoryBrowser: function () {
    return this._memoryManager.browser;
  },

  set onerror(callback) {
    this._onerror = callback;
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
  },

  get ondebug() {
    return this._ondebug;
  },

  resume: function () {
    this._scheduler.run();
  },

  run: function () {
    // TODO: Should check for running or paused.
    this._scheduler.reset();
    this._memoryManager.reset();
    const id = this._memoryManager.allocateProcess();
    this.addProgram(id);
    this._loadDefaults().then(() => {
      this._scheduler.run();
    });
  },

  _runSystems: function () {
    const memoryBrowser = this.getMemoryBrowser();
    const environment = this._environment;
    this._systems.forEach(function (system) {
      system.run(memoryBrowser, environment);
    });
  },

  _schedule: function (baton, process) {
    const name = "_" + baton.type;
    if (!(name in this)) {
      throw Error("Unknown execution message: " + baton.type);
    }
    return this[name](baton, process);
  },

  _debug: function () {
    this._scheduler.stop();
    this._ondebug();
  },

  _newprocess: function (baton) {
    const name = baton.processName;
    const id = this._memoryManager.allocateProcess();
    if (!id) {
      throw new Error("Max number of process reached!");
    }
    this.addProcess(name, id);
  },

  _call: function (baton, process) {
    const functionName = baton.functionName;
    if (functionName in this._functions) {
      const result = this._functions[functionName](...baton.args, this);
      if (result instanceof Promise) {
        this._scheduler.stop();
        result
          .catch((error) => setTimeout(this._onerror.bind(this, error)))
          .then((returnValue) => {
            process.retv.enqueue(returnValue);
            this._scheduler.run();
          });
      } else {
        process.retv.enqueue(result);
      }
    }
  },

  _loadDefaults: function () {
    return load_pal("PAL/DIV.PAL", this);
  },

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _frame: function (baton) {},

  // TODO: Consider passing the id through the baton
  _end: function (baton) {
    const currentProcessId = this._scheduler.currentProcess.id;
    this._memoryManager.freeProcess(currentProcessId);
    this._scheduler.deleteCurrent();
  },
};

export { Runtime, Baton };
