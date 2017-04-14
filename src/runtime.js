
define(['scheduler', 'memory/mapper'], function (scheduler, mapper) {
  'use strict';

  var MemoryMap = mapper.MemoryMap;
  var MemoryBrowser = mapper.MemoryBrowser;

  //TODO: Runtime should be passed with a light version of the memory map,
  // enough to be able of allocating the needed memory.
  function Runtime(processMap, memorySymbols) {
    this._ondebug = null;
    this._onfinished = null;
    this._scheduler = null;
    this._processMap = processMap;
    this._memoryMap = new MemoryMap(memorySymbols);
    this._allocateMemory();
    this._setupScheduler();
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
      this._scheduler.run();
    },

    _allocateMemory: function () {
      // TODO: Not sure if Int32Array should be encapsulated and the cell size
      // passed as a part of the memory map.
      var alignment = MemoryMap.ALIGNMENT;
      var globalSegmentSize = this._memoryMap.globalSegmentSize;
      var localSegmentSize = this._memoryMap.localSegmentSize;
      // TODO: It remains to add max private size to the multiplication.
      var processSize = localSegmentSize;
      var processPoolSize = this._memoryMap.maxProcess * processSize;
      var memorySize = globalSegmentSize + processPoolSize;
      this._mem = new Int32Array(memorySize / alignment);
      this.memoryBrowser = new MemoryBrowser(
        this._mem,
        this._memoryMap,
        this._processSize
      );
    },

    _setupScheduler: function () {
      this._scheduler = new scheduler.Scheduler(this._mem, {
        onyield: this._schedule.bind(this),
        onfinished: this.onfinished
      });
      this._scheduler.add(this._processMap.program);
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
