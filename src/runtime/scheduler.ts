import { assert } from "chai";

enum ProcessStatus {
  UNINITIALIZED = 0,
  DEAD = 1,
  ALIVE = 2,
  SLEPT = 3,
  FROZEN = 4,
}

interface Process {
  run(): Baton;

  processId: number;
  processType?: number;
  status: ProcessStatus;
  programIndex: number;
}

/**
 * The scheduler encapsulates the responsibilty of executing processes. It does
 * not know about painting the screen, playing audio, or anything like that.
 * When processes are done executing, it publishes an event to notify the
 * runtime.
 */
class Scheduler<P extends Process> {
  onfinished?: CallableFunction;
  onyield?: CallableFunction;
  onupdate?: CallableFunction;

  get currentProcess(): P {
    return this._processList[this._current];
  }

  get aliveProcesses(): Array<P> {
    return this._processList.filter(isAlive);
  }

  private _processList: Array<P>;
  private _isRunning: boolean;
  private _nextAnimationFrame: number | null;
  private _current: number;

  add(process: P) {
    // XXX: Will be replaced by sorted insertion
    this._processList.push(process);
  }

  deleteCurrent() {
    this.currentProcess.status = ProcessStatus.DEAD;
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
    if (typeof target === "function") {
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
  }

  private _scheduleStep() {
    this._nextAnimationFrame = window.requestAnimationFrame(
      this._step.bind(this),
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
      const process = this.currentProcess;
      const baton = process.run();
      this._yield(baton);

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

  private _yield(baton: Baton): unknown {
    const { currentProcess } = this;
    if (typeof (baton as any).npc !== "undefined") {
      currentProcess.programIndex = (baton as any).npc;
    }
    return this._call("onyield", baton, currentProcess);
  }
}
class Baton implements Record<any, any> {
  type: string;

  constructor(type: string, data: Record<any, any> = {}) {
    this.type = type;
    Object.keys(data).forEach(
      function (key) {
        this[key] = data[key];
      }.bind(this),
    );
  }
}

function isAlive<P extends Process>(execution: P): boolean {
  return execution.status === ProcessStatus.ALIVE;
}

export { Scheduler, Baton, Process, ProcessStatus };
