import { assert } from "chai";

interface Runnable {
  dead: boolean;
  run(): void;
}

/**
 * The scheduler encapsulates the responsibilty of executing processes. It does
 * not know about painting the screen, playing audio, or anything like that.
 * When processes are done executing, it publishes an event to notify the
 * runtime.
 */
class Scheduler {
  onerror: CallableFunction | undefined;
  onfinished: CallableFunction | undefined;
  onyield: CallableFunction | undefined;
  onupdate: CallableFunction | undefined;

  get currentExecution(): any {
    return this._processList[this._current];
  }

  private _processList: Array<Runnable>;
  private _isRunning: boolean;
  private _nextAnimationFrame: number | null;
  private _current: number;

  constructor(hooks: Record<any, any> = {}) {
    this.onyield = hooks.onyield;
    this.onfinished = hooks.onfinished;
    this.onupdate = hooks.onupdate;
    this.onerror = hooks.onerror;
    this.reset();
  }

  add(processEnvironment: any) {
    // XXX: Will be replaced by sorted insertion
    this._processList.push(processEnvironment);
  }

  deleteCurrent() {
    const currentExecution = this._processList[this._current];
    currentExecution.dead = true;
  }

  pause() {
    this.stop();
    return this._call("onpause");
  }

  reset() {
    this._processList = [];
    this._isRunning = false;
    this._nextAnimationFrame = null;
    this._startOver();
  }

  run() {
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

  private _call(name: string, ...args: Array<unknown>): unknown {
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

    if (this._processList.length === 0) {
      return this._end();
    }

    while (this._current < this._processList.length) {
      const processEnvironment = this._processList[this._current];
      const result = processEnvironment.run();
      this._takeAction(result);

      if (!this._isRunning) {
        return;
      }

      this._current++;
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

export { Scheduler, Baton, Runnable };
