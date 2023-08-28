import {
  MemoryMap,
  MemoryBrowser,
  MemoryCell,
  ProcessView,
} from "../memoryBrowser/mapper";
import { SymbolTable } from "../memoryBrowser/symbols";

// XXX: In DIV, memory is a continuous, and int-directionable-only (each 4
// bytes) array of cells. Pointer arithmetic can not address sub-int-size
// values (word or byte). DIV memory is 4-byte aligned.
type MemoryArray = Int32Array;

/**
 * The MemoryManager is responsible for managing the memory of a DIV2 program.
 * It allocates the contiguous memory for the program, and provides a semantic
 * API to access the memory via the MemoryBrowser.
 */
class MemoryManager {
  get browser(): MemoryBrowser {
    return this._browser;
  }

  get rawMemory(): MemoryArray {
    return this._mem;
  }

  private _browser: MemoryBrowser;
  private _map: MemoryMap;
  private _mem: MemoryArray;
  private _processTemplate: MemoryArray;

  constructor(symbols: SymbolTable) {
    this._map = new MemoryMap(symbols);
    const { globalSegmentSize, processPoolSize } = this._map;
    this._mem = new Int32Array(globalSegmentSize + processPoolSize);
    this._browser = new MemoryBrowser(this._mem, this._map);
    this._createProcessTemplate();
  }

  allocateProcess(): number {
    for (let index = 0, l = this._map.maxProcess; index < l; index++) {
      const process = this._browser.process({ index: index });
      const isFree = process.local("reserved.status").value === 0;
      if (isFree) {
        this._initializeProcessMemory(process);
        return process.id;
      }
    }
    throw new Error("Impossible to allocate a new process");
  }

  freeProcess(processId: number) {
    const process = this._browser.process({ id: processId });
    process.local("reserved.status").value = 0;
  }

  reset() {
    this._mem.fill(0);
    // TODO: Add globals
    for (let index = 0, l = this._map.maxProcess; index < l; index++) {
      const process = this._browser.process({ index: index });
      process.local("reserved.process_id").value = process.offset;
    }
  }

  _createProcessTemplate() {
    const locals = this._map.segments.locals;
    this._processTemplate = new Int32Array(this._map.processSize);
    copyDefaults(this._processTemplate, locals, 0);
    // TODO: Add privates

    function copyDefaults(
      buffer: MemoryArray,
      cells: MemoryCell[],
      base: number
    ) {
      cells.forEach((cell) => {
        const itemSize = cell.size / cell.symbol.length;
        for (let index = 0, l = cell.symbol.length; index < l; index++) {
          const itemOffset = base + index * itemSize;
          if (cell.symbol.type !== "struct") {
            buffer[itemOffset + cell.offset] = cell.symbol.default;
          } else {
            copyDefaults(buffer, cell.fields, itemOffset + cell.offset);
          }
        }
      });
    }
  }

  _initializeProcessMemory(processMemory: ProcessView) {
    const id = processMemory.id;
    processMemory.setMemory(this._processTemplate);
    processMemory.local("reserved.process_id").value = id; // restore Id
  }
}

export { MemoryManager, MemoryArray };
