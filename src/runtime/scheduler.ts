import { assert } from "chai";

/**
 * The scheduler encapsulates the responsibilty of executing processes. It does
 * not know about painting the screen, playing audio, or anything like that.
 * When processes are done executing, it publishes an event to notify the
 * runtime.
 *
 * The scheduler knows about the process life cycle, it also coordinates
 * asynchronous execution, hiding the asynchronous nature of the web into
 * the synchronous execution of the processes.
 *
 * Last but not least, the scheduler knows about errored processes, and offers
 * ways to handle and recover from them.
 */
class Scheduler {
  onerror: CallableFunction | undefined;
  onfinished: CallableFunction | undefined;
  onyield: CallableFunction | undefined;
  onupdate: CallableFunction | undefined;

  get currentError() {
    return this._currentError;
  }

  get currentExecution(): any {
    return this._processList[this._current];
  }

  private _mem: any;
  private _pmap: any;
  private _processList: Array<any>;
  private _isRunning: boolean;
  private _nextAnimationFrame: number | null;
  private _blocker: Promise<any> | null;
  private _currentError: Error | null;
  private _current: number;

  private get _isBlocking(): boolean {
    return this._blocker !== null;
  }

  private get _isFailed(): boolean {
    return this._currentError !== null;
  }

  constructor(mem, processMap, hooks: Record<any, any> = {}) {
    this.onyield = hooks.onyield;
    this.onfinished = hooks.onfinished;
    this.onupdate = hooks.onupdate;
    this.onerror = hooks.onerror;
    this._mem = mem;
    this._pmap = processMap;
    this.reset();
  }

  addBlockingFunction(promise: Promise<any>) {
    this._blocker = promise;
    this._blocker.catch(this._fail.bind(this)).then(this._unblock.bind(this));
  }

  addProcess(name: string, base: number) {
    this._add("process_" + name, base);
  }

  addProgram(base: number) {
    this._add("program", base);
  }

  deleteCurrent(): number {
    const currentExecution = this._processList[this._current];
    currentExecution.dead = true;
    return currentExecution.id;
  }

  pause() {
    this.stop();
    return this._call("onpause");
  }

  reset() {
    this._processList = [];
    this._isRunning = false;
    this._nextAnimationFrame = null;
    this._blocker = null;
    this._currentError = null;
    this._startOver();
  }

  recover() {
    this._currentError = null;
  }

  run() {
    assert(
      !this._isFailed,
      "The scheduler is failed. Handle the error at .currentError and call .recover() before calling .run()"
    );
    if (!this._isRunning) {
      this._scheduleStep();
      this._isRunning = true;
    }
  }

  stop() {
    window.cancelAnimationFrame(this._nextAnimationFrame);
    this._nextAnimationFrame = null;
    this._isRunning = false;
  }

  private _add(name: string, base: number) {
    const runnable = this._pmap[name];
    const processEnvironment = this._newProcessEnvironment(runnable, base);
    // XXX: Will be replaced by sorted insertion
    this._processList.push(processEnvironment);
  }

  private _call(name: string, ...args: Array<any>): any {
    let result;
    const target = this[name];
    if (target && typeof target.apply === "function") {
      result = target.apply(this, args);
    }
    return result;
  }

  private _end() {
    this.stop();
    return this._call("onfinished");
  }

  private _fail(error) {
    this.stop();
    this._currentError = error;
    // XXX: Force handle error synchronously, out of the promise chain.
    window.setTimeout(this._handleError.bind(this));
  }

  private _handleError() {
    assert(this._isFailed, "Scheduler is not failed but an error was handled");
    this._call("onerror", this._currentError);
  }

  private _newProcessEnvironment(runnable: CallableFunction, base: number) {
    return {
      pc: 1,
      runnable,
      id: base,
      base,
      retv: new ReturnValuesQueue(),
    };
  }

  private _removeDeadProcess() {
    this._processList = this._processList.filter(isAlive);

    function isAlive(execution) {
      return !execution.dead;
    }
  }

  private _scheduleStep() {
    this._nextAnimationFrame = window.requestAnimationFrame(
      this._step.bind(this)
    );
  }

  private _startOver() {
    this._current = 0;
  }

  private _step() {
    assert(this._isRunning, "Scheduler is paused but a _step() was attempted");
    assert(!this._isFailed, "Scheduler is failed but a _step() was attempted");

    if (this._isBlocking) {
      this._scheduleStep();
      return;
    }

    if (this._processList.length === 0) {
      return this._end();
    }

    while (this._current < this._processList.length) {
      const execution = this._processList[this._current];
      const result = execution.runnable(this._mem, execution);
      this._takeAction(result);

      if (this._isBlocking) {
        this._scheduleStep();
        return;
      }

      if (this._isRunning) {
        this._current++;
      }
    }
    this._call("onupdate");

    this._removeDeadProcess();
    this._startOver();
    this._scheduleStep();
  }

  private _takeAction(result: any): any {
    if (!(result instanceof Baton)) {
      throw Error("Execution returned an unknown result:" + result);
    }
    if (typeof (result as any).npc !== "undefined") {
      this.currentExecution.pc = (result as any).npc;
    }
    return this._call("onyield", result);
  }

  private _unblock() {
    this._blocker = null;
  }
}

class Baton implements Record<any, any> {
  type: string;

  constructor(type: string, data: Record<any, any> = {}) {
    this.type = type;
    Object.keys(data).forEach(
      function (key) {
        this[key] = data[key];
      }.bind(this)
    );
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

export { Scheduler, Baton };
