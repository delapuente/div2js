
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
  MemoryMap.GLOBAL_OFFSET = 1;  // TODO: Must take into account all
                                // DIV padding including program source. Leave
                                // 0 address free.
  MemoryMap.SIZE_IN_BYTES = {
    'byte': 1,
    'word': 2,
    'int': 4
  };

  MemoryMap.prototype = {
    constructor: MemoryMap,

    get globalSegmentSize() {
      return this._getSegmentSize(this.cells['globals']) / MemoryMap.ALIGNMENT;
    },

    get localSegmentSize() {
      return this._getSegmentSize(this.cells['locals']) / MemoryMap.ALIGNMENT;
    },

    get processPoolSize() {
      return this.maxProcess * this.processSize;
    },

    get maxPrivateSegmentSize() {
      return Math.max.call(
        Math,
        Object.keys(this.cells.privates).map(function (processName) {
          this._getSegmentSize(this.cells.privates[processName]);
        }, this)
      );
    },

    get processSize() {
      var size = this.localSegmentSize + this.maxPrivateSegmentSize;
      //XXX: Force to be ALWAYS even. In addition to an odd pool offset,
      //it warrants all the process to start in an ODD address so the id
      //is ALWAYS ODD and thus, always TRUE.
      if (size % 2 !== 0) { return size + 1; }
      return size;
    },

    get poolOffset() {
      return MemoryMap.GLOBAL_OFFSET + this.globalSegmentSize;
    },

    _getSegmentSize: function (cells) {
      return cells.reduce(function (total, cell) {
        return total + cell.size;
      }, 0);
    },

    _buildMap: function () {
      this.cells.globals = this._inToCells(this.symbols.globals);
      this.cells.locals = this._inToCells(this.symbols.locals);
      this.cells.privates = {};
      Object.keys(this.symbols.privates).forEach(function (processName) {
        var privateMap = this._inToCells(this.symbols.privates[processName]);
        this.cells.privates[processName] = privateMap;
      }, this);
    },

    _inToCells: function (symbols) {
      var offset = 0;
      var cells = [];
      symbols.forEach(function (symbol) {
        var cell = Object.create(symbol);
        cell.size = this._sizeOf(symbol);
        cell.offset = offset;
        if (symbol.type === 'struct') {
          cell.fields = this._inToCells(symbol.fields);
        }
        offset += cell.size / MemoryMap.ALIGNMENT;
        cells.push(cell);
      }.bind(this));
      return cells;
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
  function MemoryBrowser(mem, map) {
    this._mem = mem;
    this._map = map;
  }

  MemoryBrowser.prototype = {
    constructor: MemoryBrowser,

    global: function (name) {
      return this.seek(this.offset('globals', name));
    },

    process: function (options) {
      var options = options || {};
      var id = options.id;
      var type = options.type; //TODO: Remove. Now is necessary but in the
                               //future, the type should be retrieved from the
                               //local reserved.process_type

      //TODO: Check id validity
      if (id) {
        return new ProcessView(this, id);
      }
      var index = options.index || 0;
      var poolOffset = this._map.poolOffset;
      var processSize = this._map.processSize;
      var processOffset = poolOffset + index * processSize;
      return new ProcessView(this, processOffset, type);
    },

    setMemory: function (buffer, offset) {
      return this._mem.set(buffer, offset);
    },

    offset: function (segment, name, base, processName) {
      base = base || (segment === 'globals' ? MemoryMap.GLOBAL_OFFSET : 0);
      var cells = this._map.cells[segment];
      //TODO: Refactor needed, all this ifs... Privates are special, perhaps
      // they deserve a special tratment over an unified layer dealing with
      // somethign lower level than named segments such as the segment array
      // itself.
      if (segment === 'privates') {
        cells = cells[processName];
        base += this._map.localSegmentSize;
      }
      var names = name.split('.');
      var offset = this._offset(cells, names);
      if (offset === undefined) {
        throw new Error('Can not get the offset for ' + name);
      }
      return base + offset;
    },

    seek: function (offset) {
      return new MemView(this._mem, offset);
    },

    _offset: function (cells, names) {
      var offset;
      var name = names[0];
      var cell = cells.find(function (cell) {
        return cell.name === name;
      });
      if (!cell) { return undefined; }
      if (cell.type !== 'struct') { return cell.offset; }
      var fieldOffset = this._offset(cell.fields, names.slice(1));
      if (fieldOffset === undefined) { return undefined; }
      return cell.offset + fieldOffset;
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

  function ProcessView(browser, base, type) {
    this._browser = browser;
    this._base = base;
    this._type = type;
  }

  ProcessView.prototype = {
    constructor: ProcessView,

    setMemory: function (memBuffer) {
      this._browser.setMemory(memBuffer, this.offset); // Ignore id
    },

    local: function (name) {
      return this._browser.seek(
        this._browser.offset('locals', name, this._base)
      );
    },

    private: function (name) {
      return this._browser.seek(
        this._browser.offset('privates', name, this._base, this._type)
      );
    },

    get offset() {
      return this._base;
    },

    get id() {
      return this.local('reserved.process_id').value;
    }
  };

  return {
    MemoryMap: MemoryMap,
    MemoryBrowser: MemoryBrowser,
    exportToJson: MemoryMap.exportToJson,
    importFromJson: MemoryMap.importFromJson
  };
});
