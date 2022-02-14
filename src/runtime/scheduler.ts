import { assert } from "chai";

let rAF = window.requestAnimationFrame;

function Scheduler (mem, processMap, hooks) {
  hooks = hooks || {};
  this.onyield = hooks.onyield;
  this.onfinished = hooks.onfinished;
  this.onupdate = hooks.onupdate;
  this._mem = mem;
  this._pmap = processMap;
  this.reset();
}

Scheduler.prototype = {
  constructor: Scheduler,

  get currentExecution () {
    return this._processList[this._current];
  },

  run: function () {
    if (!this._isRunning) {
      this._isRunning = true;
      this._scheduleStep();
    }
  },

  pause: function () {
    this.stop();
    return this._call('onpause');
  },

  stop: function () {
    this._isRunning = false;
  },

  resetExectution: function () {
    this._processList = [];
    this.reset();
  },

  reset: function () {
    this._processList = [];
    this._isRunning = false;
    this._current = 0;
    this._blocker = null;
    this._blockedExecution = null;
  },

  addProgram: function (base) {
    this._add('program', base);
  },

  addProcess: function (name, base) {
    this._add('process_' + name, base);
  },

  addBlockingFunction: function (promise) {
    this._blocker = promise;
    this._blockedExecution = this.currentExecution;
    this._blocker
      .then(this._unblock.bind(this))
      .catch((err) => {
        // TODO: Maybe call onerror?
        throw new Error(err);
      });
  },

  deleteCurrent: function () {
    let currentExecution = this._processList[this._current];
    currentExecution.dead = true;
    return currentExecution.id;
  },

  get _isBlocking () {
    return this._blocker !== null;
  },

  _add: function (name, base) {
    let runnable = this._pmap[name];
    let processEnvironment = this._newProcessEnvironment(runnable, base);
    // XXX: Will be replaced by sorted insertion
    this._processList.push(processEnvironment);
  },

  _newProcessEnvironment: function (runnable, base) {
    return {
      pc: 1,
      runnable: runnable,
      id: base,
      base: base,
      retv: new ReturnValuesQueue()
    };
  },

  _scheduleStep: function () {
    rAF(this._step.bind(this));
  },

  _step: function () {
    let processList = this._processList;
    let processCount = processList.length;

    if (processCount === 0) {
      return this._end();
    }

    while (
      !this._isBlocking &&
      this._isRunning &&
      this._current < this._processList.length
    ) {
      let execution = processList[this._current];
      let result = execution.runnable(this._mem, execution);
      this._takeAction(result);
      if (this._isRunning) { this._current++; }
    }

    if (this._isBlocking) {
      this._scheduleStep();
    } else if (this._isRunning) {
      this._call('onupdate');
      this._current = 0;
      this._processList = this._processList.filter(isAlive);
      this._scheduleStep();
    }

    function isAlive (execution) {
      return !execution.dead;
    }
  },

  _end: function () {
    this.stop();
    return this._call('onfinished');
  },

  _takeAction: function (result) {
    if (!(result instanceof Baton)) {
      throw Error('Execution returned an unknown result:' + result);
    }
    if (typeof (result as any).npc !== 'undefined') {
      this.currentExecution.pc = (result as any).npc;
    }
    return this._call('onyield', result);
  },

  _call: function (name, ...args) {
    let result;
    let target = this[name];
    if (target && typeof target.apply === 'function') {
      result = target.apply(this, args);
    }
    return result;
  },

  _unblock: function () {
    this._blocker = null;
    this._current = this.processList.indexOf(this._blockedExecution);
    assert(this._current !== -1, 'Blocked executions not found in the process list.');
    this._blockedExecution = null;
  }
};

function Baton (type, data) {
  data = data || {}
  this.type = type;
  Object.keys(data).forEach(function (key) {
    this[key] = data[key];
  }.bind(this));
}

function ReturnValuesQueue () {
  this._data = [];
}

ReturnValuesQueue.prototype = {
  constructor: ReturnValuesQueue,

  enqueue: function (value) {
    this._data.push(value);
  },

  dequeue: function () {
    return this._data.shift();
  }
};

export {
  Scheduler,
  Baton
};
