
define([], function () {

  function MemoryMap(symbols) {
    // TODO: In DIV, the binary has process pool and globals in the data segment
    // but in this implementation we are allocating that memory at the beginning
    // so we need either the different segment sizes (for debugging) or the
    // complete memory size (regular execution).
    // TODO: consider embedding an initial memory dump in the form of a base64
    // blob. Heavy "binaries".
    this.maxProcess = 5919; // XXX: This is the max process count for empty
                            // programs. Still trying to figure out why.
    this.symbols = symbols;
    this.cells = Object.create(null);
    this._buildMap();
  }

  //TODO: Perhaps we are lacking the concept of cell size or addressable word
  // as the minimum number of bytes addressable. In the case of DIV2, this
  // number is 4 which matches the ALIGNMENT.

  MemoryMap.ALIGNMENT = 4; // 4 bytes
  MemoryMap.GLOBAL_OFFSET = 0;  // TODO: Must take into account all
                                // DIV padding including program source
  MemoryMap.SIZE_IN_BYTES = {
    'byte': 1,
    'word': 2,
    'int': 4
  };

  MemoryMap.prototype = {
    constructor: MemoryMap,

    get globalSegmentSize() {
      return this._getSegmentSize('globals');
    },

    get localSegmentSize() {
      return this._getSegmentSize('locals');
    },

    _getSegmentSize: function (segment) {
      var cells = this.cells[segment];
      return cells.reduce(function (total, cell) {
        return total + cell.size;
      }, 0);
    },

    _buildMap: function () {
      this.cells.globals = this.symbols.globals.map(this._getCell, this);
      this.cells.locals = this.symbols.locals.map(this._getCell, this);
    },

    _getCell: function (symbol) {
      var cell = Object.create(symbol);
      cell.size = this._sizeOf(symbol);
      if (symbol.type === 'struct') {
        cell.fields = symbol.fields.map(this._getCell, this);
      }
      return cell;
    },

    _sizeOf: function (symbol) {
      var individualSize;
      if (symbol.type !== 'struct') {
        individualSize = MemoryMap.SIZE_IN_BYTES[symbol.type];
      }
      else {
        individualSize = symbol.fields.reduce(function (partial, field) {
          return partial + this._sizeOf(field);
        }.bind(this), 0);
      }
      return individualSize * symbol.length;
    }
  };

  MemoryMap.exportToJson = function (map) {
    return map.symbols;
  };

  MemoryMap.importFromJson = function (json) {
    return new MemoryMap(json);
  };

  // XXX: Consider to move to its own module.
  function MemoryBrowser(mem, map, processSize) {
    this._mem = mem;
    this._map = map;
    this._processSize = processSize;
  }

  MemoryBrowser.prototype = {
    constructor: MemoryBrowser,

    global: function (name) {
      return this.seek(this.offset('globals', name));
    },

    process: function (options) {
      var index = options.index || 0;
      var processOffset = MemoryMap.GLOBAL_OFFSET + index * this._processSize;
      return new ProcessView(this, processOffset);
    },

    //TODO: Add support for structs
    offset: function (segment, name, base) {
      segment = segment.toLowerCase()
      base = base || 0;
      //TODO: It lacks of LOCAL_OFFSET;
      var segmentBase = segment === 'globals' ?
                        MemoryMap.GLOBAL_OFFSET : 0;
      //TODO: Should the offset be part of the memory map? I think so. Perhaps
      // this deserves another thought.
      var offset = 0;
      var cells = this._map.cells[segment];
      for (var i = 0, l = cells.length; i < l; i++) {
        if (cells[i].name === name) { break; }
        offset += cells[i].size / MemoryMap.ALIGNMENT;
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

  function ProcessView(browser, base) {
    this._browser = browser;
    this._base = base;
  }

  ProcessView.prototype = {
    constructor: ProcessView,

    local: function (name) {
      return this._browser.seek(
        this._browser.offset('locals', name, this._base)
      );
    }
  };

  return {
    MemoryMap: MemoryMap,
    MemoryBrowser: MemoryBrowser,
    exportToJson: MemoryMap.exportToJson,
    importFromJson: MemoryMap.importFromJson
  };
});
