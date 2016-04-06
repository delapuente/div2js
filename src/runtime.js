
define(['scheduler'], function (scheduler) {
  'use strict';

  function Runtime(processMap) {
    this._ondebug = null;
    this._onfinished = null;
    this._scheduler = null;
    this._processMap = processMap;
  }

  Runtime.prototype = {
    constructor: Runtime,

    set onfinished(callback) {
      this._onfinished = callback;
      if (this._scheduler instanceof scheduler.Scheduler) {
        this._scheduler.onfinished = this._onfinished;
      }
    },

    get onfinished() { return this._onfinished; },

    set ondebug(callback) {
      this._ondebug = callback;
      if (this._scheduler instanceof scheduler.Scheduler) {
        this._scheduler.ondebug = this._ondebug;
      }
    },

    get ondebug() { return this._ondebug; },

    run: function () {
      this._mem = new Int32Array(1);
      this._scheduler = new scheduler.Scheduler(this._mem, {
        ondebug: this.ondebug,
        onfinished: this.onfinished
      });
      this._scheduler.addProcess(this._processMap.program);
      this._scheduler.run();
    }
  };

  function Baton(type, data) {
    data = data || {};
    this.type = type;
    Object.keys(data).forEach(function (key) {
      this[key] = data[key];
    }.bind(this));
  }

  return {
    Runtime: Runtime,
    Baton: Baton
  };
});
