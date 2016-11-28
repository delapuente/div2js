
define([], function () {
  'use strict';

  function DebugSession(mmap, mem) {
    this._map = mmap;
    this._mem = mem;
    this._buildSymbols();
  }

  DebugSession.prototype = {
    constructor: DebugSession,

    _buildSymbols: function () {
      this.symbols = Object.create(null);
      var globalOffset = this._map.G.G_BASE;
      Object.keys(this._map.G).forEach(function (globalName) {
        this.symbols[globalName] = globalOffset + this._map.G[globalName];
      }.bind(this));
    },

    seek: function (offset) {
      return new MemCell(this._mem, offset);
    }
  };

  function MemCell(storage, offset) {
    this._storage = storage;
    this._offset = offset;
    // TODO: It remains to add type info
  }

  MemCell.prototype = {
    constructor: MemCell,

    get value() {
      return this._storage[this._offset];
    },

    set value(v) {
      this._storage[this._offset] = v;
    }
  };

  return {
    MemCell: MemCell,

    DebugSession: DebugSession,

    debug: function (mem, mmap) {
      return new DebugSession(mem, mmap);
    }
  };
});
