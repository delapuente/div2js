// TODO: In DIV, the binary has process pool and globals in the data segment
// but in this implementation we are allocating that memory at the beginning
// so we need either the different segment sizes (for debugging) or the
// complete memory size (regular execution).

import { DivSymbol, WellKnownSymbols } from "./definitions";
import { SymbolTable } from "./symbols";
import { MemoryArray } from "../runtime/memory";
import { assert } from "chai";

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
    return this._getSegmentSize(this.segments["globals"]) / MemoryMap.ALIGNMENT;
  }

  get maxPrivateSegmentSize(): number {
    return Math.max(
      0,
      ...Object.keys(this.segments.privates).map((processName) => {
        return this._getSegmentSize(this.segments.privates[processName]);
      })
    );
  }

  get localSegmentSize(): number {
    return this._getSegmentSize(this.segments["locals"]) / MemoryMap.ALIGNMENT;
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

  readonly segments: MemorySegments;
  readonly maxProcess: number;
  readonly symbols: SymbolTable;

  constructor(symbols: SymbolTable) {
    this.maxProcess = 5919; /* XXX: This is the max process count for empty
                               programs. Still trying to figure out why. */
    this.symbols = symbols;
    this.segments = Object.create(null);
    this._buildMap();
  }

  static exportToJson(map: MemoryMap): SymbolTable {
    return map.symbols;
  }

  private _buildMap() {
    this.segments.globals = this._inToCells(this.symbols.globals);
    this.segments.locals = this._inToCells(this.symbols.locals);
    this.segments.privates = Object.keys(this.symbols.privates).reduce(
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

interface ProcessSearchOptions {
  id?: number;
  index?: number;
  type?: string;
}

// TODO: Consider to move to its own module.
/**
 * The `MemoryBrowser` provides means to inspect and manipulate the memory
 * of a DIV program in terms of the symbol definitions. I.e.: instead of
 * accessing the raw memory, it allows to inspect the values of the variables
 * per name and/or per process.
 */
class MemoryBrowser {
  private _map: MemoryMap;
  private _mem: MemoryArray;

  constructor(mem: MemoryArray, map: MemoryMap) {
    this._mem = mem;
    this._map = map;
  }

  global(
    name: (keyof WellKnownSymbols["wellKnownGlobals"] & string) | string
  ): MemView {
    return this.seek(this.offset("globals", name));
  }

  process(options: ProcessSearchOptions = {}): ProcessView {
    const id = options.id;
    const type = options.type; /* TODO: Remove. Now is necessary but in the
                                future, the type should be retrieved from the
                                local reserved.process_type */

    // TODO: Check id validity
    if (id) {
      return new ProcessView(this, id, type);
    }
    const index = options.index ?? 0;
    const poolOffset = this._map.poolOffset;
    const processSize = this._map.processSize;
    const processOffset = poolOffset + index * processSize;
    return new ProcessView(this, processOffset, type);
  }

  seek(offset: number): MemView {
    return new MemView(this._mem, offset);
  }

  setMemory(buffer: MemoryArray, offset: number) {
    this._mem.set(buffer, offset);
  }

  offset(
    segmentName: keyof MemorySegments,
    name: string,
    base = 0,
    processName?: string
  ): number {
    if (segmentName === "privates" && processName === undefined) {
      throw new Error("processName is required for privates");
    }
    const segments =
      segmentName === "privates"
        ? this._map.segments.privates[processName]
        : this._map.segments[segmentName];
    let memoryBase = segmentName === "globals" ? MemoryMap.GLOBAL_OFFSET : base;
    if (segmentName === "privates") {
      memoryBase += this._map.localSegmentSize;
    }
    const names = name.split(".");
    const offset = this._offset(segments, names);

    return memoryBase + offset;
  }

  _offset(cells: MemoryCell[], names: string[]): number | undefined {
    const name = names[0];
    const cell = cells.find((cell) => cell.symbol.name === name);
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
  private _mem: MemoryArray;
  private _offset: number;

  constructor(storage: MemoryArray, offset: number) {
    this._mem = storage;
    this._offset = offset;
  }

  get value(): number {
    return this._mem[this._offset];
  }

  set value(v: number) {
    this._mem[this._offset] = v;
  }
}

class ProcessView {
  get id(): number {
    return this.local("reserved.process_id").value;
  }

  get offset(): number {
    return this._base;
  }

  private _base: number;
  private _browser: MemoryBrowser;
  private _type: string;

  constructor(browser: MemoryBrowser, base: number, type: string) {
    this._browser = browser;
    this._base = base;
    this._type = type;
  }

  local(name: string): MemView {
    return this._browser.seek(this._browser.offset("locals", name, this._base));
  }

  private(name): MemView {
    return this._browser.seek(
      this._browser.offset("privates", name, this._base, this._type)
    );
  }

  setMemory(memBuffer: MemoryArray) {
    this._browser.setMemory(memBuffer, this.offset); // Ignore id
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
