define([], function () {
  'use strict';

  var rAF = window.requestAnimationFrame;

  function Scheduler(mem, processMap, hooks) {
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

    get currentExecution() {
      return this._processList[this._current];
    },

    run: function () {
      if (!this._running) {
        this._running = true;
        this._scheduleStep();
      }
    },

    pause: function () {
      this.stop();
      return this._call('onpause');
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
      var currentExecution = this._processList[this._current];
      currentExecution.dead = true;
      return currentExecution.id;
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
      rAF(this._step.bind(this));
    },

    _step: function () {
      var processList = this._processList;
      var processCount = processList.length;

      if (processCount === 0) {
        return this._end();
      }

      while (this._running && this._current < this._processList.length) {
        var execution = processList[this._current];
        var result = execution.runnable(this._mem, execution);
        this._takeAction(result);
        if (this._running) { this._current++; }
      }

      if (this._running) {
        this._call('onupdate');
        this._current = 0;
        this._processList = this._processList.filter(isAlive);
        this._scheduleStep();
      }

      function isAlive(execution) {
        return !execution.dead;
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
      return this._call('onyield', result);
    },

    _call: function (name) {
      var result;
      var target = this[name];
      if (target && typeof target.apply === 'function') {
        var args = Array.prototype.slice.call(arguments, 1);
        result = target.apply(this, args);
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
