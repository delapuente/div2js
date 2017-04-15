define([], function () {
  'use strict';

  function Scheduler(mem, processMap, hooks) {
    hooks = hooks || {};
    this.onyield = hooks.onyield;
    this.onfinished = hooks.onfinished;
    this._mem = mem;
    this._pmap = processMap;
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

    resetExectution: function () {
      this._processList = [];
      this.reset();
    },

    reset: function () {
      this._processList = [];
      this._running = false;
      this._current = 0;
    },

    addProgram: function (base) {
      this._add('program', base);
    },

    addProcess: function (name, base) {
      this._add('process_' + name, base);
    },

    deleteCurrent: function () {
      var removed = this._processList.splice(this._current, 1);
      this._current = this._current;
      return removed.id;
    },

    _add: function (name, base) {
      var runnable = this._pmap[name];
      var processEnvironment = this._newProcessEnvironment(runnable, base);
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
        var execution = this.currentExecution;
        var result = execution.runnable(this._mem, execution);
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
        this.currentExecution.pc = result.npc;
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

    get currentExecution() {
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
