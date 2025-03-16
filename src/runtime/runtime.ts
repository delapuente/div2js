import { MemoryArray, MemoryManager } from "./memory";
import { Scheduler, Baton, Process, ProcessStatus } from "./scheduler";
import { DivError } from "../errors";
import { VideoSystem } from "../systems/video/wgl2idx";
import { Div2FileSystem } from "../systems/files/div2FileSystem";
import { MemoryBrowser, ProcessView } from "../memoryBrowser/mapper";

type SystemKind = "video" | "files" | "input";
class ProcessInMemory implements Process {
  retv: ReturnValuesQueue;

  constructor(
    processId: number,
    private _runnable: CallableFunction,
    private _memory: MemoryArray,
    private _processView: ProcessView,
    // TODO: This should be a pointer to a memory region with the actual args.
    private _args: unknown[],
  ) {
    this.processId = processId;
    this.programIndex = 0;
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
    if (this._data.length === 0) {
      throw new Error("No return values to dequeue.");
    }
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
  initialize(memoryBrowser: MemoryBrowser): void;
  getComponent?<T>(
    process: Process,
    componentType: new (...args: unknown[]) => T,
  ): T;
  run?(runtime: Runtime): void;
}

interface Component {
  process: Process;
}

type GetSystemReturnType<K> = K extends "video"
  ? VideoSystem
  : K extends "files"
    ? Div2FileSystem
    : K extends "input"
      ? System
      : never;

// TODO: Runtime should be passed with a light version of the memory map,
// enough to be able of allocating the needed memory.
class Runtime {
  onerror?: (error: DivError) => void;
  ondebug?: CallableFunction;
  _onfinished?: CallableFunction;
  _videoSystem: VideoSystem | null = null;
  _fileSystem: Div2FileSystem | null = null;
  _inputSystem: System | null = null;
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
    process.status = ProcessStatus.ALIVE;
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
    process.status = ProcessStatus.ALIVE;
    this._scheduler.add(process);
  }

  registerFunction(fn: CallableFunction, name: string) {
    if (name && typeof this._functions[name] !== "undefined") {
      throw new Error("Function already registered with name: " + name);
    }
    this._functions[name] = fn;
  }

  registerVideoSystem(system: VideoSystem) {
    if (this._videoSystem) {
      throw new Error("Video system already registered.");
    }
    this._videoSystem = system;
    this._videoSystem.initialize(this.getMemoryBrowser());
  }

  getVideoSystem(): VideoSystem {
    return this._videoSystem;
  }

  registerFileSystem(system: Div2FileSystem) {
    if (this._fileSystem) {
      throw new Error("File system already registered.");
    }
    this._fileSystem = system;
    this._fileSystem.initialize(this.getMemoryBrowser());
  }

  getFileSystem(): Div2FileSystem {
    return this._fileSystem;
  }

  registerInputSystem(system: System) {
    if (this._inputSystem) {
      throw new Error("Input system already registered.");
    }
    this._inputSystem = system;
    this._inputSystem.initialize(this.getMemoryBrowser());
  }

  getInputSystem(): System {
    return this._inputSystem;
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

  newProcess(processName: string, args: number[], process) {
    const id = this._memoryManager.allocateProcess();
    this.addProcess(processName, id, args);
    process.retv.enqueue(id);
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
    const currentProcessId = this._scheduler.currentProcess.processId;
    this._scheduler.deleteCurrent();
    this._memoryManager.freeProcess(currentProcessId);
  }

  _runSystems() {
    // TODO: The runtime should read the input state first, then run the processes, then render.
    [this._videoSystem, this._fileSystem, this._inputSystem].forEach(
      (system) => {
        if (typeof system.run === "function") {
          system.run(this);
        }
      },
    );
  }

  _handle(baton: Baton, originator: Process) {
    const name = `_${baton.type}`;
    if (!(name in this)) {
      throw Error("Unknown execution message: " + baton.type);
    }
    return this[name](baton, originator);
  }

  _debug() {
    return this.debug();
  }

  _newProcess(baton: Baton, originator: Process) {
    const name = baton.processName as string;
    const args = (baton.args ?? []) as number[];
    return this.newProcess(name, args, originator);
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

export { Runtime, Baton, System, Component };
