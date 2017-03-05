
define(['memory/mapper'], function (mapper) {
  'use strict';

  function DebugSession(mmap, mem) {
    this._map = mmap;
    this._mem = mem;
  }

  DebugSession.prototype = {
    constructor: DebugSession,

    //TODO: Add support for structs
    offset: function (segment, name, base) {
      segment = segment.toLowerCase()
      base = base || 0;
      //TODO: It lacks of LOCAL_OFFSET;
      var segmentBase = segment === 'globals' ?
                        mapper.MemoryMap.GLOBAL_OFFSET : 0;
      //TODO: Should the offset be part of the memory map? I think so. Perhaps
      // this deserves another thought.
      var offset = 0;
      var cells = this._map.cells[segment];
      for (var i = 0; (cells[i].name !== name); i++) {
        offset += cells[i].size / mapper.MemoryMap.ALIGNMENT;
      }
      return base + segmentBase + offset;
    },

    seek: function (offset) {
      return new MemView(this._mem, offset);
    }
  };

  function MemView(storage, offset) {
    this._storage = storage;
    this._offset = offset;
    // TODO: It remains to add type info
  }

  MemView.prototype = {
    constructor: MemView,

    get value() {
      return this._storage[this._offset];
    },

    set value(v) {
      this._storage[this._offset] = v;
    }
  };

  return {
    MemView: MemView,

    DebugSession: DebugSession,

    debug: function (mem, mmap) {
      return new DebugSession(mem, mmap);
    }
  };
});
