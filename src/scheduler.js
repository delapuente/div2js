// TODO: Rename the scheduler to be the runner.
// The scheduler is actually fused to the current runtime.
define([], function () {
  'use strict';

  function Scheduler(mem, hooks) {
    hooks = hooks || {};
    this.onyield = hooks.onyield;
    this.onfinished = hooks.onfinished;
    this._mem = mem;
    this._processList = [];
    this.reset();
  }

  Scheduler.prototype = {
    constructor: Scheduler,

    run: function () {
      if (!this._running) {
        this._running = true;
        this._scheduleStep();
      }
    },

    stop: function () {
      this._running = false;
    },

    reset: function () {
      this._running = false;
      this._current = 0;
    },

    add: function (code) {
      var execEnvironment = this._newExecEnvironment(code);
      // XXX: Will be replaced by sorted insertion
      this._processList.push(execEnvironment);
    },

    deleteCurrent: function () {
      this._processList.splice(this._current, 1);
      this._current = this._current;
    },

    _newExecEnvironment: function (code) {
      return {
        pc: 1,
        code: code,
        retv: new ReturnValuesQueue()
      };
    },

    _scheduleStep: function () {
      setTimeout(this._step.bind(this));
    },

    _step: function () {
      if (!this._running) {
        return;
      }
      if (this._processList.length === 0) {
        this._end();
      }
      else {
        var execution = this._currentExecution;
        var result = execution.code(this._mem, execution);
        this._takeAction(result);
      }
    },

    _end: function () {
      this.stop();
      return this._call('onfinished');
    },

    _takeAction: function (result) {
      if (!(result instanceof Baton)) {
        throw Error('Execution returned an unknown result:', result);
      }
      if (typeof result.npc !== 'undefined') {
        this._currentExecution.pc = result.npc;
      }
      return this._call('onyield', result).then(function () {
        // TODO: Take into account rescheduling flags once added.
        this._current++;
        this._scheduleStep();
      }.bind(this));
    },

    set _current(v) {
      if (this._processList.length) {
        this._currentIndex = v % this._processList.length;
      } else {
        this._currentIndex = 0;
      }
    },

    get _current() {
      return this._currentIndex;
    },

    get _currentExecution() {
      return this._processList[this._current];
    },

    _call: function (name) {
      var result;
      var target = this[name];
      var args = Array.prototype.slice.call(arguments, 1);
      if (typeof target.apply === 'function') {
        result = target.apply(this, args);
      }
      if (!(result instanceof Promise)) {
        result = Promise.resolve(result);
      }
      return result;
    }
  };

  function Baton(type, data) {
    data = data || {};
    this.type = type;
    Object.keys(data).forEach(function (key) {
      this[key] = data[key];
    }.bind(this));
  }

  function ReturnValuesQueue() {
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

  return {
    Scheduler: Scheduler,
    Baton: Baton
  };
});
