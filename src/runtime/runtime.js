
define(['runtime/memory', 'runtime/scheduler'], function (memory, scheduler) {
  'use strict';

  var Scheduler = scheduler.Scheduler;
  var MemoryManager = memory.MemoryManager;

  //TODO: Runtime should be passed with a light version of the memory map,
  // enough to be able of allocating the needed memory.
  function Runtime(processMap, memorySymbols) {
    this._ondebug = null;
    this._onfinished = null;
    this._systems = [];
    this._memoryManager = new MemoryManager(memorySymbols);
    var memory = this._memoryManager.getMemory();
    this._scheduler = new Scheduler(memory, processMap, {
      onyield: this._schedule.bind(this),
      onupdate: this._runSystems.bind(this)
    });
  }

  Runtime.prototype = {
    constructor: Runtime,

    registerSystem: function (system) {
      if (system.initialize()) {
        this._systems.push(system);
      }
    },

    getMemoryBrowser: function () {
      return this._memoryManager.getBrowser();
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
      this._scheduler.reset();
      this._memoryManager.reset();
      var id = this._memoryManager.allocateProcess();
      this._scheduler.addProgram(id);
      this._scheduler.run();
    },

    _runSystems: function () {
      var memoryBrowser = this.getMemoryBrowser();
      this._systems.forEach(function (system) {
        system.run(memoryBrowser);
      });
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
      var id = this._memoryManager.allocateProcess();
      if (!id) { throw new Error('Max number of process reached!'); }
      this._scheduler.addProcess(name, id);
    },

    _call: function (baton) {

    },

    // TODO: Consider passing the id through the batton
    _end: function (baton) {
      var currentProcessId = this._scheduler.currentExecution.id;
      this._memoryManager.freeProcess(currentProcessId);
      this._scheduler.deleteCurrent();
    }
  };

  return {
    Runtime: Runtime,
    Baton: scheduler.Baton
  };
});
