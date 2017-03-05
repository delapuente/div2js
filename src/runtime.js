
define(['scheduler', 'memory/mapper'], function (scheduler, mapper) {
  'use strict';

  var MemoryMap = mapper.MemoryMap;

  //TODO: Runtime should be passed with a light version of the memory map,
  // enough to be able of allocating the needed memory.
  function Runtime(processMap, memoryMap) {
    this._ondebug = null;
    this._onfinished = null;
    this._scheduler = null;
    this._processMap = processMap;
    this._memoryMap = new MemoryMap(memoryMap);
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
      // TODO: Not sure if Int32Array should be encapsulated and the cell size
      // passed as a part of the memory map.
      var alignment = MemoryMap.ALIGNMENT;
      var globalSegmentSize = this._memoryMap.globalSegmentSize;
      this._mem = new Int32Array(globalSegmentSize / alignment);
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
