// TODO: In DIV, the binary has process pool and globals in the data segment
// but in this implementation we are allocating that memory at the beginning
// so we need either the different segment sizes (for debugging) or the
// complete memory size (regular execution).

import { DivSymbol } from "./definitions";
import { SymbolTable } from "./symbols";

interface MemoryCell {
  symbol: DivSymbol;
  offset: number;
  size: number;
  fields?: MemoryCell[];
}

type MemorySegments = {
  globals: MemoryCell[];
  locals: MemoryCell[];
  privates: { [processName: string]: MemoryCell[] };
};

type MemorySegmentName = keyof MemorySegments;

// TODO: consider embedding an initial memory dump in the form of a base64
// blob. Heavy "binaries".

/**
 * The `MemoryMap` translates DIV program symbols to memory locations (cells)
 * in terms of relative offsets.
 *
 * Notice the `MemoryMap` knows nothing about the real values of the variables
 * since it does not have any reference to the program's actual memory.
 */
class MemoryMap {
  // TODO: Perhaps we are lacking the concept of cell size or addressable word
  // as the minimum number of bytes addressable. In the case of DIV2, this
  // number is 4 which matches the ALIGNMENT.
  static readonly ALIGNMENT = 4; // 4 bytes
  static readonly GLOBAL_OFFSET = 1; /* TODO: Must take into account all
                                        DIV padding including program source.
                                        Leave 0 address free. */
  static readonly SIZE_IN_BYTES = Object.freeze({
    byte: 1 as const,
    word: 2 as const,
    int: 4 as const,
  });

  get globalSegmentSize(): number {
    return this._getSegmentSize(this.cells["globals"]) / MemoryMap.ALIGNMENT;
  }

  get maxPrivateSegmentSize(): number {
    return Math.max(
      0,
      ...Object.keys(this.cells.privates).map((processName) => {
        return this._getSegmentSize(this.cells.privates[processName]);
      })
    );
  }

  get localSegmentSize(): number {
    return this._getSegmentSize(this.cells["locals"]) / MemoryMap.ALIGNMENT;
  }

  get poolOffset(): number {
    return MemoryMap.GLOBAL_OFFSET + this.globalSegmentSize;
  }

  get processPoolSize(): number {
    return this.maxProcess * this.processSize;
  }

  get processSize(): number {
    const size = this.localSegmentSize + this.maxPrivateSegmentSize;
    // XXX: Force to be ALWAYS even. In addition to an odd pool offset,
    // it warrants all the process to start in an ODD address so the id
    // is ALWAYS ODD and thus, always TRUE.
    return size % 2 === 0 ? size : size + 1;
  }

  readonly cells: MemorySegments;
  readonly maxProcess: number;
  readonly symbols: SymbolTable;

  constructor(symbols: SymbolTable) {
    this.maxProcess = 5919; /* XXX: This is the max process count for empty
                               programs. Still trying to figure out why. */
    this.symbols = symbols;
    this.cells = Object.create(null);
    this._buildMap();
  }

  static exportToJson(map: MemoryMap): SymbolTable {
    return map.symbols;
  }

  private _buildMap() {
    this.cells.globals = this._inToCells(this.symbols.globals);
    this.cells.locals = this._inToCells(this.symbols.locals);
    this.cells.privates = Object.keys(this.symbols.privates).reduce(
      (privates, processName) => {
        const privateMap = this._inToCells(this.symbols.privates[processName]);
        privates[processName] = privateMap;
        return privates;
      },
      {}
    );
  }

  private _getSegmentSize(cells): number {
    return cells.reduce(function (total, cell) {
      return total + cell.size;
    }, 0);
  }

  private _inToCells(symbols: DivSymbol[]): MemoryCell[] {
    let offset = 0;
    const cells = symbols.map((symbol) => {
      const cell =
        symbol.type === "struct"
          ? {
              symbol,
              offset,
              size: this._sizeOf(symbol),
              fields: this._inToCells(symbol.fields),
            }
          : {
              symbol,
              offset,
              size: this._sizeOf(symbol),
            };
      offset += cell.size / MemoryMap.ALIGNMENT;
      return cell;
    });
    return cells;
  }

  private _sizeOf(symbol: DivSymbol): number {
    const individualSize =
      symbol.type !== "struct"
        ? MemoryMap.SIZE_IN_BYTES[symbol.type]
        : symbol.fields.reduce((partial, field) => {
            return partial + this._sizeOf(field);
          }, 0);
    return individualSize * symbol.length;
  }
}

// TODO: Consider to move to its own module.
/**
 * The `MemoryBrowser` provides means to inspect and manipulate the memory
 * of a DIV program in terms of the symbol definitions. I.e.: instead of
 * accessing the raw memory, it allows to inspect the values of the variables
 * per name and/or per process.
 */
class MemoryBrowser {
  private _mem;

  private _map;

  constructor(mem, map) {
    this._mem = mem;
    this._map = map;
  }

  global(name) {
    return this.seek(this.offset("globals", name));
  }

  process(options) {
    options = options || {};
    const id = options.id;
    const type = options.type; /* TODO: Remove. Now is necessary but in the
                                future, the type should be retrieved from the
                                local reserved.process_type */

    // TODO: Check id validity
    if (id) {
      return new ProcessView(this, id, type);
    }
    const index = options.index || 0;
    const poolOffset = this._map.poolOffset;
    const processSize = this._map.processSize;
    const processOffset = poolOffset + index * processSize;
    return new ProcessView(this, processOffset, type);
  }

  setMemory(buffer, offset) {
    return this._mem.set(buffer, offset);
  }

  offset(segment, name, base = 0, processName?) {
    base = segment === "globals" ? MemoryMap.GLOBAL_OFFSET : base;
    let cells = this._map.cells[segment];
    // TODO: Refactor needed, all this ifs... Privates are special, perhaps
    // they deserve a special tratment over an unified layer dealing with
    // somethign lower level than named segments such as the segment array
    // itself.
    if (segment === "privates") {
      cells = cells[processName];
      base += this._map.localSegmentSize;
    }
    const names = name.split(".");
    const offset = this._offset(cells, names);
    if (offset === undefined) {
      throw new Error("Can not get the offset for " + name);
    }
    return base + offset;
  }

  seek(offset) {
    return new MemView(this._mem, offset);
  }

  _offset(cells, names) {
    let offset;
    const name = names[0];
    const cell = cells.find(function (cell) {
      return cell.symbol.name === name;
    });
    if (!cell) {
      return undefined;
    }
    if (cell.symbol.type !== "struct") {
      return cell.offset;
    }
    const fieldOffset = this._offset(cell.fields, names.slice(1));
    if (fieldOffset === undefined) {
      return undefined;
    }
    return cell.offset + fieldOffset;
  }
}

class MemView {
  private _storage;

  private _offset: number;

  constructor(storage, offset) {
    this._storage = storage;
    this._offset = offset;
  }

  get value() {
    return this._storage[this._offset];
  }

  set value(v) {
    this._storage[this._offset] = v;
  }
}

class ProcessView {
  private _browser;

  private _base;

  private _type;

  constructor(browser, base, type) {
    this._browser = browser;
    this._base = base;
    this._type = type;
  }

  setMemory(memBuffer) {
    this._browser.setMemory(memBuffer, this.offset); // Ignore id
  }

  local(name) {
    return this._browser.seek(this._browser.offset("locals", name, this._base));
  }

  private(name) {
    return this._browser.seek(
      this._browser.offset("privates", name, this._base, this._type)
    );
  }

  get offset() {
    return this._base;
  }

  get id() {
    return this.local("reserved.process_id").value;
  }
}

const { exportToJson } = MemoryMap;

export {
  MemoryMap,
  MemoryBrowser,
  MemoryCell,
  exportToJson,
  ProcessView,
  MemorySegmentName,
};
