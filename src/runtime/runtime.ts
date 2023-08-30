import { MemoryManager } from "./memory";
import { Scheduler, Baton, Process } from "./scheduler";
import { load_pal } from "../builtins";
import { DivError } from "../errors";

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

interface System {
  initialize(): void;
  run?(memoryBrowser: any, environment: any): void;
}

// TODO: Runtime should be passed with a light version of the memory map,
// enough to be able of allocating the needed memory.
class Runtime {
  _onerror?: (error: DivError) => void;
  _ondebug?: CallableFunction;
  _onfinished?: CallableFunction;
  _systems: System[];
  _systemMap: { [key: string]: System };
  _functions: { [key: string]: CallableFunction };
  _memoryManager: MemoryManager;
  _environment: any;
  _pmap: any;
  _mem: any;
  _scheduler: Scheduler<Process>;

  constructor(
    processMap,
    memoryManager: MemoryManager,
    scheduler: Scheduler<Process>
  ) {
    this._onerror = null;
    this._ondebug = null;
    this._onfinished = null;
    this._systems = [];
    this._systemMap = {};
    this._functions = {};
    this._memoryManager = memoryManager;
    this._environment = new Environment();
    this._pmap = processMap;
    this._mem = this._memoryManager.rawMemory;
    this._scheduler = scheduler;
  }

  addProcess(name: string, base: number) {
    const runnable = this._pmap["process_" + name];
    const processEnvironment = new ProcessImpl(runnable, base, this._mem);
    this._scheduler.add(processEnvironment);
  }

  addProgram(base: number) {
    const runnable = this._pmap["program"];
    const processEnvironment = new ProcessImpl(runnable, base, this._mem);
    this._scheduler.add(processEnvironment);
  }

  registerSystem(system: System, name: string) {
    if (name && typeof this._systemMap[name] !== "undefined") {
      throw new Error("System already registered with name: " + name);
    }
    system.initialize();
    this._systems.push(system);
    this._systemMap[name] = system;
  }

  registerFunction(fn: CallableFunction, name: string) {
    if (name && typeof this._functions[name] !== "undefined") {
      throw new Error("Function already registered with name: " + name);
    }
    this._functions[name] = fn;
  }

  getSystem(name) {
    return this._systemMap[name];
  }

  getMemoryBrowser() {
    return this._memoryManager.browser;
  }

  set onerror(callback) {
    this._onerror = callback;
  }

  get onerror() {
    return this._onerror;
  }

  set onfinished(callback) {
    this._onfinished = callback;
    if (this._scheduler instanceof Scheduler) {
      this._scheduler.onfinished = this._onfinished.bind(this);
    }
  }

  get onfinished() {
    return this._onfinished;
  }

  set ondebug(callback) {
    this._ondebug = callback;
  }

  get ondebug() {
    return this._ondebug;
  }

  resume() {
    this._scheduler.run();
  }

  start() {
    // TODO: Should check for running or paused.
    this._scheduler.onyield = this._schedule.bind(this);
    this._scheduler.onupdate = this._runSystems.bind(this);
    this._scheduler.reset();
    this._memoryManager.reset();
    const id = this._memoryManager.allocateProcess();
    this.addProgram(id);
    this._loadDefaults().then(() => {
      this._scheduler.run();
    });
  }

  _runSystems() {
    const memoryBrowser = this.getMemoryBrowser();
    const environment = this._environment;
    this._systems.forEach(function (system) {
      if (typeof system.run === "function") {
        system.run(memoryBrowser, environment);
      }
    });
  }

  _schedule(baton, process) {
    const name = "_" + baton.type;
    if (!(name in this)) {
      throw Error("Unknown execution message: " + baton.type);
    }
    return this[name](baton, process);
  }

  _debug() {
    this._scheduler.stop();
    this._ondebug();
  }

  _newprocess(baton) {
    const name = baton.processName;
    const id = this._memoryManager.allocateProcess();
    this.addProcess(name, id);
  }

  _call(baton, process) {
    const functionName = baton.functionName;
    if (functionName in this._functions) {
      let result = null;
      try {
        result = this._functions[functionName](...baton.args, this);
      } catch (error) {
        if (error instanceof DivError) {
          this._onerror(error);
        } else {
          throw error;
        }
      }
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
  }

  _loadDefaults() {
    return load_pal("PAL/DIV.PAL", this);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _frame(baton) {}

  // TODO: Consider passing the id through the baton
  _end(baton) {
    const currentProcessId = this._scheduler.currentProcess.id;
    this._memoryManager.freeProcess(currentProcessId);
    this._scheduler.deleteCurrent();
  }
}

export { Runtime, Baton, System };
