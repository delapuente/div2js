define(['memory/mapper'], function (mapper) {
  'use strict';

  var MemoryMap = mapper.MemoryMap;
  var MemoryBrowser = mapper.MemoryBrowser;

  function MemoryManager(symbols) {
    this._map = new MemoryMap(symbols);
    this._allocateMemory();
    this._createProcessTemplate();
  }

  MemoryManager.prototype = {
    constructor: MemoryManager,

    getBrowser: function () {
      return this._browser;
    },

    getMemory: function () {
      return this._mem;
    },

    reset: function () {
      this._mem.fill(0);
      //TODO: Add globals
      for (var index = 0, l = this._map.maxProcess; index < l; index++) {
        var process = this._browser.process({ index: index });
        process.local('reserved.process_id').value = process.offset;
      }
    },

    allocateProcess: function () {
      for (var index = 0, l = this._map.maxProcess; index < l; index++) {
        var process = this._browser.process({ index: index });
        var isFree = process.local('reserved.status').value === 0;
        if (isFree) {
          this._initializeProcessMemory(process);
          return process.id;
        }
      }
      return undefined;
    },

    freeProcess: function (processId) {
      var process = this._browser.process({ id: processId });
      process.local('reserved.status').value = 0;
    },

    _allocateMemory: function () {
      var memorySize = this._map.globalSegmentSize + this._map.processPoolSize;
      this._mem = new Int32Array(memorySize);
      this._browser = new MemoryBrowser(this._mem, this._map);
    },

    _initializeProcessMemory: function (process) {
      var id = process.id;
      process.setMemory(this._processTemplate);
      process.local('reserved.process_id').value = id; // restore Id
    },

    _createProcessTemplate: function () {
      var locals = this._map.cells['locals'];
      this._processTemplate = new Int32Array(this._map.processSize);
      copyDefaults(this._processTemplate, locals, 0);
      //TODO: Add privates

      function copyDefaults(buffer, cells, base) {
        cells.forEach(function (cell) {
          var length = cell.length;
          var itemSize = cell.size / cell.length;
          for (var i = 0, l = cell.length; i < l; i++) {
            var itemOffset = base + (i * itemSize);
            if (cell.type !== 'struct') {
              buffer[itemOffset + cell.offset] = cell.default;
            }
            else {
              copyDefaults(buffer, cell.fields, itemOffset + cell.offset);
            }
          }
        });
      }
    }
  };

  return {
    MemoryManager: MemoryManager
  };
});
