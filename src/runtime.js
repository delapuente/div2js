
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

    run: function () {
      this._mem = new Int32Array(1);
      this._scheduler = new scheduler.Scheduler(this._mem, {
        onyield: this._schedule.bind(this),
        onfinished: this.onfinished
      });
      this._scheduler.add(this._processMap.program);
      this._scheduler.run();
    },

    _passingMemory: function (callback) {
      return function () {
        var result;
        if (typeof callback === 'function') {
          result = callback(this._mem, this._memoryMap);
        }
        return result;
      };
    },

    _schedule: function (baton) {
      var name = '_' + baton.type;
      if (!(name in this)) {
        throw Error('Unknown execution message: ' + baton.type);
      }
      return this[name](baton);
    },

    _debug: function (baton) {
      return this._ondebug();
    },

    _newprocess: function (baton) {
      var name = baton.processName;
      var process = this._processMap['process_' + name];
      this._scheduler.add(process);
    },

    _end: function (baton) {
      this._scheduler.deleteCurrent();
    }
  };

  return {
    Runtime: Runtime,
    Baton: scheduler.Baton
  };
});
