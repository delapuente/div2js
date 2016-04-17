
define(['scheduler'], function (scheduler) {
  'use strict';

  function Runtime(processMap, memoryMap) {
    this._ondebug = null;
    this._onfinished = null;
    this._scheduler = null;
    this._processMap = processMap;
    this._memoryMap = memoryMap;
  }

  Runtime.prototype = {
    constructor: Runtime,

    set onfinished(callback) {
      this._onfinished = this._passingMemory(callback);
      if (this._scheduler instanceof scheduler.Scheduler) {
        this._scheduler.onfinished = this._onfinished;
      }
    },

    get onfinished() { return this._onfinished; },

    set ondebug(callback) {
      this._ondebug = this._passingMemory(callback);
      if (this._scheduler instanceof scheduler.Scheduler) {
        this._scheduler.ondebug = this._ondebug;
      }
    },

    get ondebug() { return this._ondebug; },

    _passingMemory: function (callback) {
      if (typeof callback === 'function') {
        return callback.bind(undefined, this._mem, this._memoryMap);
      }
      return callback;
    },

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
