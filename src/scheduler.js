define([], function () {
  'use strict';

  function Scheduler(mem, hooks) {
    hooks = hooks || {};
    this.ondebug = hooks.ondebug;
    this.onfinished = hooks.onfinished;
    this._mem = mem;
    this._processList = [];
    this.reset();
  }

  Scheduler.prototype = {
    constructor: Scheduler,

    addProcess: function (process) {
      var execEnvironment = this.newExecEnvironment(process);
      // XXX: Will be replaced by sorted insertion
      this._processList.push(execEnvironment);
    },

    newExecEnvironment: function (process) {
      return {
        pc: 1,
        process: process
      };
    },

    run: function () {
      if (!this._running) {
        this._running = true;
        this._scheduleStep();
      }
    },

    reset: function () {
      this._running = false;
      this._currentProcess = 0;
    },

    _scheduleStep: function () {
      setTimeout(this._step.bind(this));
    },

    _step: function () {
      if (!this._running) {
        return;
      }
      if (this._processList.length === 0) {
        return this.end();
      }
      var currentEnvironment = this._processList[this._currentProcess];
      var result = currentEnvironment.process(this._mem, currentEnvironment);
      this.takeAction(result);
    },

    end: function () {
      this.stop();
      this._call('onfinished');
    },

    stop: function () {
      this._running = false;
    },

    takeAction: function (result) {
      var actionName = '_onaction' + result.type;
      if (!(actionName in this)) {
        throw Error('Execution primitive unknown:', result);
      }
      return this[actionName](result);
    },

    _onactiondebug: function (baton) {
      this._processList[this._currentProcess].pc = baton.npc;
      this._call('ondebug', this._mem);
      this._scheduleStep();
    },

    _onactionend: function () {
      this._processList.splice(this._currentProcess, 1);
      this._scheduleStep();
    },

    _call: function (name) {
      var args = Array.prototype.slice.call(arguments, 1);
      var target = this[name];
      if (typeof target.apply === 'function') {
        return target.apply(this, args);
      }
    }
  };

  return {
    Scheduler: Scheduler
  };
});
