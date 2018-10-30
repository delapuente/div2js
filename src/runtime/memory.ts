import * as mapper from '../memory/mapper';

let MemoryMap = mapper.MemoryMap;
let MemoryBrowser = mapper.MemoryBrowser;

function MemoryManager (symbols) {
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
    // TODO: Add globals
    for (let index = 0, l = this._map.maxProcess; index < l; index++) {
      let process = this._browser.process({ index: index });
      process.local('reserved.process_id').value = process.offset;
    }
  },

  allocateProcess: function () {
    for (let index = 0, l = this._map.maxProcess; index < l; index++) {
      let process = this._browser.process({ index: index });
      let isFree = process.local('reserved.status').value === 0;
      if (isFree) {
        this._initializeProcessMemory(process);
        return process.id;
      }
    }
    return undefined;
  },

  freeProcess: function (processId) {
    let process = this._browser.process({ id: processId });
    process.local('reserved.status').value = 0;
  },

  _allocateMemory: function () {
    let memorySize = this._map.globalSegmentSize + this._map.processPoolSize;
    this._mem = new Int32Array(memorySize);
    this._browser = new MemoryBrowser(this._mem, this._map);
  },

  _initializeProcessMemory: function (process) {
    let id = process.id;
    process.setMemory(this._processTemplate);
    process.local('reserved.process_id').value = id; // restore Id
  },

  _createProcessTemplate: function () {
    let locals = this._map.cells['locals'];
    this._processTemplate = new Int32Array(this._map.processSize);
    copyDefaults(this._processTemplate, locals, 0);
    // TODO: Add privates

    function copyDefaults (buffer, cells, base) {
      cells.forEach(function (cell) {
        let length = cell.length;
        let itemSize = cell.size / cell.length;
        for (let i = 0, l = cell.length; i < l; i++) {
          let itemOffset = base + (i * itemSize);
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

export {
  MemoryManager
};
