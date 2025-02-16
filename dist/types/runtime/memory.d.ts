import { MemoryBrowser, ProcessView } from "../memoryBrowser/mapper";
import { SymbolTable } from "../memoryBrowser/symbols";
type MemoryArray = Int32Array;
/**
 * The MemoryManager is responsible for managing the memory of a DIV2 program.
 * It allocates the contiguous memory for the program, and provides a semantic
 * API to access the memory via the MemoryBrowser.
 */
declare class MemoryManager {
    get browser(): MemoryBrowser;
    get rawMemory(): MemoryArray;
    private _browser;
    private _map;
    private _mem;
    private _processTemplate;
    constructor(symbols: SymbolTable);
    allocateProcess(): number;
    freeProcess(processId: number): void;
    reset(): void;
    _createProcessTemplate(): void;
    _initializeProcessMemory(processMemory: ProcessView): void;
}
export { MemoryManager, MemoryArray };
