
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
    this._initializeMemory();
    this._setupScheduler();
  }

  Runtime.prototype = {
    constructor: Runtime,

    getMemoryBrowser: function () {
      return this._memoryBrowser;
    },

    set onfinished(callback) {
      this._onfinished = callback;
      if (this._scheduler instanceof scheduler.Scheduler) {
        this._scheduler.onfinished = this._onfinished.bind(this);
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
      var globalSegmentSize = this._memoryMap.globalSegmentSize;
      var processPoolSize = this._memoryMap.processPoolSize
      var memorySize = globalSegmentSize + processPoolSize;
      this._mem = new Int32Array(memorySize);
      this._memoryBrowser = new MemoryBrowser(
        this._mem,
        this._memoryMap
      );
    },

    _initializeMemory: function () {
      for (var index = 0, l = this._memoryMap.maxProcess; index < l; index++) {
        var process = this._memoryBrowser.process({ index: index });
        process.local('reserved.process_id').value = process.offset;
      }
    },

    _setupScheduler: function () {
      var onfinished = typeof this.onfinished === 'function' ?
                       this.onfinished.bind(this) : undefined;
      this._scheduler = new scheduler.Scheduler(this._mem, {
        onyield: this._schedule.bind(this),
        onfinished: onfinished
      });
      var programId = this._allocateProcess();
      this._scheduler.add(this._processMap.program, programId);
    },

    _allocateProcess: function () {
      for (var index = 0, l = this._memoryMap.maxProcess; index < l; index++) {
        var process = this._memoryBrowser.process({ index: index });
        var isFree = process.local('reserved.status').value === 0;
        if (isFree) {
          var processId = process.local('reserved.process_id').value;
          this._enableProcess(process);
          return processId;
        }
      }
      return undefined;
    },

    _enableProcess: function (process) {
      process.local('reserved.status').value = 2;
    },

    _freeProcess: function (processId) {
      var process = this._memoryBrowser.process({ id: processId });
      process.local('reserved.status').value = 0;
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
      var processId = this._allocateProcess();
      if (!processId) {
        throw new Error('Max number of process reached!');
      }
      this._scheduler.add(process, processId);
    },

    _end: function (baton) {
      // TODO: Consider passing the id through the batton
      var currentProcessId = this._scheduler.currentExecution.id;
      this._freeProcess(currentProcessId);
      this._scheduler.deleteCurrent();
    }
  };

  return {
    Runtime: Runtime,
    Baton: scheduler.Baton
  };
});
