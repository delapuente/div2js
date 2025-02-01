import { MemoryArray, MemoryManager } from "./memory";
import { Scheduler, Baton, Process, ProcessStatus } from "./scheduler";
import { DivError } from "../errors";
import { VideoSystem } from "../systems/video/wgl2idx";
import { Div2FileSystem } from "../systems/files/div2FileSystem";
import { MemoryBrowser, ProcessView } from "../memoryBrowser/mapper";

type SystemKind = "video" | "files";
class ProcessInMemory implements Process {
  retv: ReturnValuesQueue;
  private _pc: number;

  constructor(
    processId: number,
    private _runnable: CallableFunction,
    private _memory: MemoryArray,
    private _processView: ProcessView,
    // XXX: This should be a pointer to a memory region with the actual args.
    private _args: unknown[],
  ) {
    this.processId = processId;
    this.programIndex = 1;
    this.status = ProcessStatus.UNINITIALIZED;
    this.retv = new ReturnValuesQueue();
  }

  get processId() {
    return this._processView.local("reserved.process_id").value;
  }

  set processId(v: number) {
    this._processView.local("reserved.process_id").value = v;
  }

  get processType() {
    return this._processView.local("reserved.process_type").value;
  }

  set processType(v: number) {
    this._processView.local("reserved.process_type").value = v;
  }

  get status() {
    return this._processView.local("reserved.status").value;
  }

  set status(v: ProcessStatus) {
    this._processView.local("reserved.status").value = v;
  }

  get programIndex() {
    return this._processView.local("reserved.program_index").value;
  }

  set programIndex(v: number) {
    this._processView.local("reserved.program_index").value = v;
  }

  run() {
    return this._runnable(this._memory, this, this._args);
  }

  // Deprecations
  get id() {
    return this.processId;
  }

  set id(v: number) {
    this.processId = v;
  }

  get pc() {
    return this.programIndex;
  }

  set pc(v: number) {
    this.programIndex = v;
  }

  get dead() {
    return this.status === ProcessStatus.DEAD;
  }

  set dead(v: boolean) {
    this.status = v ? ProcessStatus.DEAD : ProcessStatus.ALIVE;
  }

  get initialized() {
    return this.status === ProcessStatus.ALIVE;
  }

  set initialized(v: boolean) {
    this.status = v ? ProcessStatus.ALIVE : ProcessStatus.UNINITIALIZED;
  }
}

class ReturnValuesQueue {
  private _data: Array<unknown>;

  constructor() {
    this._data = [];
  }

  enqueue(value: unknown) {
    this._data.push(value);
  }

  dequeue() {
    return this._data.shift();
  }
}

class Environment {
  public video: { width: number; height: number };

  constructor() {
    this.video = {
      width: 320,
      height: 200,
    };
  }
}

interface System {
  initialize(): void;
  run?(runtime: Runtime): void;
}

type GetSystemReturnType<K> = K extends "video"
  ? VideoSystem
  : K extends "files"
    ? Div2FileSystem
    : never;

// TODO: Runtime should be passed with a light version of the memory map,
// enough to be able of allocating the needed memory.
class Runtime {
  onerror?: (error: DivError) => void;
  ondebug?: CallableFunction;
  _onfinished?: CallableFunction;
  _systems: System[];
  _systemMap: { video?: VideoSystem; files?: Div2FileSystem };
  _functions: { [key: string]: CallableFunction };
  _memoryManager: MemoryManager;
  public environment: Environment;
  _pmap: any;
  _mem: any;
  _scheduler: Scheduler<Process>;

  constructor(
    processMap,
    memoryManager: MemoryManager,
    scheduler: Scheduler<Process>,
  ) {
    this.onerror = null;
    this.ondebug = null;
    this._onfinished = null;
    this._systems = [];
    this._systemMap = {};
    this._functions = {};
    this._memoryManager = memoryManager;
    this.environment = new Environment();
    this._pmap = processMap;
    this._mem = this._memoryManager.rawMemory;
    this._scheduler = scheduler;
  }

  addProcess(name: string, base: number, args: number[] = []) {
    const runnable = this._pmap["process_" + name];
    const processView = this.getMemoryBrowser().process({ id: base });
    const process = new ProcessInMemory(
      base,
      runnable,
      this._mem,
      processView,
      args,
    );
    this._scheduler.add(process);
  }

  addProgram(base: number) {
    const runnable = this._pmap["program"];
    const processView = this.getMemoryBrowser().process({ id: base });
    const process = new ProcessInMemory(
      base,
      runnable,
      this._mem,
      processView,
      [],
    );
    this._scheduler.add(process);
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

  getSystem<T extends SystemKind>(name: T): GetSystemReturnType<T> {
    if (name === "video") {
      return this._systemMap[name] as GetSystemReturnType<T>;
    }
    if (name === "files") {
      return this._systemMap[name] as GetSystemReturnType<T>;
    }
    return this._systemMap[name] as GetSystemReturnType<T>;
  }

  getMemoryBrowser(): MemoryBrowser {
    return this._memoryManager.browser;
  }

  get currentProcess() {
    return this._scheduler.currentProcess;
  }

  get aliveProcesses() {
    return this._scheduler.aliveProcesses;
  }

  set onfinished(callback) {
    this._onfinished = callback;
    this._scheduler.onfinished = this._onfinished.bind(this);
  }

  get onfinished() {
    return this._onfinished;
  }

  resume() {
    this._scheduler.run();
  }

  start() {
    // TODO: Should check for running or paused.
    this._scheduler.onyield = this._handle.bind(this);
    this._scheduler.onupdate = this._runSystems.bind(this);
    this._scheduler.reset();
    this._memoryManager.reset();
    const id = this._memoryManager.allocateProcess();
    this.addProgram(id);
    this._scheduler.run();
  }

  debug() {
    this._scheduler.stop();
    this.ondebug();
  }

  newProcess(processName: string, args: number[]) {
    const id = this._memoryManager.allocateProcess();
    this.addProcess(processName, id, args);
  }

  call(functionName: string, args: unknown[], process) {
    if (functionName in this._functions) {
      let result = null;
      try {
        result = this._functions[functionName](...args, this);
      } catch (error) {
        if (error instanceof DivError) {
          this.onerror(error);
        } else {
          throw error;
        }
      }
      if (result instanceof Promise) {
        this._scheduler.stop();
        result
          .catch((error) => {
            if (!this.onerror) {
              throw error;
            }
            setTimeout(this.onerror.bind(this, error));
          })
          .then((returnValue) => {
            process.retv.enqueue(returnValue);
            this._scheduler.run();
          });
      } else {
        process.retv.enqueue(result);
      }
    } else {
      throw new Error("Function not found: " + functionName);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  frame() {}

  // TODO: Consider passing the id through the baton
  end() {
    const currentProcessId = this._scheduler.currentProcess.id;
    this._scheduler.deleteCurrent();
    this._memoryManager.freeProcess(currentProcessId);
  }

  _runSystems() {
    // TODO: The runtime should read the input state first, then run the processes, then render.
    this._systems.forEach((system) => {
      if (typeof system.run === "function") {
        system.run(this);
      }
    });
  }

  _handle(baton, originator: Process) {
    const name = `_${baton.type}`;
    if (!(name in this)) {
      throw Error("Unknown execution message: " + baton.type);
    }
    return this[name](baton, originator);
  }

  _debug() {
    return this.debug();
  }

  _newProcess(baton) {
    const name = baton.processName;
    const args = (baton.args ?? []) as number[];
    return this.newProcess(name, args);
  }

  _call(baton, process) {
    const functionName = baton.functionName;
    const args = baton.args;
    return this.call(functionName, args, process);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _frame() {
    return this.frame();
  }

  // TODO: Consider passing the id through the baton
  _end() {
    return this.end();
  }
}

export { Runtime, Baton, System };
