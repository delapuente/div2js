
// TODO: In DIV, the binary has process pool and globals in the data segment
// but in this implementation we are allocating that memory at the beginning
// so we need either the different segment sizes (for debugging) or the
// complete memory size (regular execution).

// TODO: consider embedding an initial memory dump in the form of a base64
// blob. Heavy "binaries".

class MemoryMap {

  get globalSegmentSize () {
    return this._getSegmentSize(this.cells['globals']) / MemoryMap.ALIGNMENT;
  }

  get localSegmentSize () {
    return this._getSegmentSize(this.cells['locals']) / MemoryMap.ALIGNMENT;
  }

  get processPoolSize () {
    return this.maxProcess * this.processSize;
  }

  get maxPrivateSegmentSize (): number {
    return Math.max(
      0,
      ...Object.keys(this.cells.privates).map(function (processName) {
        return this._getSegmentSize(this.cells.privates[processName]);
      }, this)
    );
  }

  get processSize () {
    let size = this.localSegmentSize + this.maxPrivateSegmentSize;
    // XXX: Force to be ALWAYS even. In addition to an odd pool offset,
    // it warrants all the process to start in an ODD address so the id
    // is ALWAYS ODD and thus, always TRUE.
    if (size % 2 !== 0) { return size + 1; }
    return size;
  }

  get poolOffset () {
    return MemoryMap.GLOBAL_OFFSET + this.globalSegmentSize;
  }

  // TODO: Perhaps we are lacking the concept of cell size or addressable word
  // as the minimum number of bytes addressable. In the case of DIV2, this
  // number is 4 which matches the ALIGNMENT.

  static ALIGNMENT = 4;     // 4 bytes

  static GLOBAL_OFFSET = 1; /* TODO: Must take into account all
                               DIV padding including program source. Leave
                               0 address free. */

  static SIZE_IN_BYTES = {
    'byte': 1,
    'word': 2,
    'int' : 4
  };

  maxProcess: number;

  symbols;

  cells;

  constructor (symbols) {
    this.maxProcess = 5919; /* XXX: This is the max process count for empty
                               programs. Still trying to figure out why. */
    this.symbols = symbols;
    this.cells = Object.create(null);
    this._buildMap();
  }

  static exportToJson (map) {
    return map.symbols;
  }

  static importFromJson (json) {
    return new MemoryMap(json);
  }

  private _getSegmentSize (cells): number {
    return cells.reduce(function (total, cell) {
      return total + cell.size;
    }, 0);
  }

  private _buildMap () {
    this.cells.globals = this._inToCells(this.symbols.globals);
    this.cells.locals = this._inToCells(this.symbols.locals);
    this.cells.privates = {};
    Object.keys(this.symbols.privates).forEach(function (processName) {
      let privateMap = this._inToCells(this.symbols.privates[processName]);
      this.cells.privates[processName] = privateMap;
    }, this);
  }

  private _inToCells (symbols) {
    let offset = 0;
    let cells = [];
    symbols.forEach(function (symbol) {
      let cell = Object.create(symbol);
      cell.size = this._sizeOf(symbol);
      cell.offset = offset;
      if (symbol.type === 'struct') {
        cell.fields = this._inToCells(symbol.fields);
      }
      offset += cell.size / MemoryMap.ALIGNMENT;
      cells.push(cell);
    }.bind(this));
    return cells;
  }

  private _sizeOf (symbol) {
    let individualSize;
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
}

// TODO: Consider to move to its own module.
class MemoryBrowser {

  private _mem;

  private _map;

  constructor (mem, map) {
    this._mem = mem;
    this._map = map;
  }

  global (name) {
    return this.seek(this.offset('globals', name));
  }

  process (options) {
    options = options || {};
    let id = options.id;
    let type = options.type; /* TODO: Remove. Now is necessary but in the
                                future, the type should be retrieved from the
                                local reserved.process_type */

    // TODO: Check id validity
    if (id) {
      return new ProcessView(this, id, type);
    }
    let index = options.index || 0;
    let poolOffset = this._map.poolOffset;
    let processSize = this._map.processSize;
    let processOffset = poolOffset + index * processSize;
    return new ProcessView(this, processOffset, type);
  }

  setMemory (buffer, offset) {
    return this._mem.set(buffer, offset);
  }

  offset (segment, name, base = 0, processName?) {
    base = segment === 'globals' ? MemoryMap.GLOBAL_OFFSET : base;
    let cells = this._map.cells[segment];
    // TODO: Refactor needed, all this ifs... Privates are special, perhaps
    // they deserve a special tratment over an unified layer dealing with
    // somethign lower level than named segments such as the segment array
    // itself.
    if (segment === 'privates') {
      cells = cells[processName];
      base += this._map.localSegmentSize;
    }
    let names = name.split('.');
    let offset = this._offset(cells, names);
    if (offset === undefined) {
      throw new Error('Can not get the offset for ' + name);
    }
    return base + offset;
  }

  seek (offset) {
    return new MemView(this._mem, offset);
  }

  _offset (cells, names) {
    let offset;
    let name = names[0];
    let cell = cells.find(function (cell) {
      return cell.name === name;
    });
    if (!cell) { return undefined; }
    if (cell.type !== 'struct') { return cell.offset; }
    let fieldOffset = this._offset(cell.fields, names.slice(1));
    if (fieldOffset === undefined) { return undefined; }
    return cell.offset + fieldOffset;
  }
}

class MemView {

  private _storage;

  private _offset: number;

  constructor (storage, offset) {
    this._storage = storage;
    this._offset = offset;
  }

  get value () {
    return this._storage[this._offset];
  }

  set value (v) {
    this._storage[this._offset] = v;
  }

}

class ProcessView {

  private _browser;

  private _base;

  private _type;

  constructor (browser, base, type) {
    this._browser = browser;
    this._base = base;
    this._type = type;
  }

  setMemory (memBuffer) {
    this._browser.setMemory(memBuffer, this.offset); // Ignore id
  }

  local (name) {
    return this._browser.seek(
      this._browser.offset('locals', name, this._base)
    );
  }

  private (name) {
    return this._browser.seek(
      this._browser.offset('privates', name, this._base, this._type)
    );
  }

  get offset () {
    return this._base;
  }

  get id () {
    return this.local('reserved.process_id').value;
  }
}

const { exportToJson, importFromJson } = MemoryMap;

export {
  MemoryMap,
  MemoryBrowser,
  exportToJson,
  importFromJson
};
