import { DivSymbol, WellKnownSymbols } from "./definitions";
import { SymbolTable } from "./symbols";
import { MemoryArray } from "../runtime/memory";
interface MemoryCell {
    symbol: DivSymbol;
    offset: number;
    size: number;
    fields?: MemoryCell[];
}
type MemorySegments = {
    globals: MemoryCell[];
    locals: MemoryCell[];
    privates: {
        [processName: string]: MemoryCell[];
    };
};
type MemorySegmentName = keyof MemorySegments;
/**
 * The `MemoryMap` translates DIV program symbols to memory locations (cells)
 * in terms of relative offsets.
 *
 * Notice the `MemoryMap` knows nothing about the real values of the variables
 * since it does not have any reference to the program's actual memory.
 */
declare class MemoryMap {
    static readonly ALIGNMENT = 4;
    static readonly GLOBAL_OFFSET = 1;
    static readonly SIZE_IN_BYTES: Readonly<{
        byte: 1;
        word: 2;
        int: 4;
    }>;
    get totalSize(): number;
    get globalSegmentSize(): number;
    get maxPrivateSegmentSize(): number;
    get localSegmentSize(): number;
    get poolOffset(): number;
    get processPoolSize(): number;
    get processSize(): number;
    readonly segments: MemorySegments;
    readonly maxProcess: number;
    readonly symbols: SymbolTable;
    constructor(symbols: SymbolTable);
    static exportToJson(map: MemoryMap): SymbolTable;
    private _buildMap;
    private _getSegmentSize;
    private _inToCells;
    private _sizeOf;
}
interface ProcessSearchOptions {
    id?: number;
    index?: number;
    type?: string;
}
/**
 * The `MemoryBrowser` provides means to inspect and manipulate the memory
 * of a DIV program in terms of the symbol definitions. I.e.: instead of
 * accessing the raw memory, it allows to inspect the values of the variables
 * per name and/or per process.
 */
declare class MemoryBrowser {
    private _map;
    private _mem;
    constructor(mem: MemoryArray, map: MemoryMap);
    global(name: (keyof WellKnownSymbols["wellKnownGlobals"] & string) | string): MemView;
    process(options?: ProcessSearchOptions): ProcessView;
    seek(offset: number): MemView;
    setMemory(buffer: MemoryArray, offset: number): void;
    offset(segmentName: keyof MemorySegments, name: string, base?: number, processName?: string): number;
    _offset(cells: MemoryCell[], names: string[]): number | undefined;
}
declare class MemView {
    private _mem;
    private _offset;
    constructor(storage: MemoryArray, offset: number);
    get value(): number;
    set value(v: number);
}
declare class ProcessView {
    get id(): number;
    get offset(): number;
    private _base;
    private _browser;
    private _type;
    constructor(browser: MemoryBrowser, base: number, type: string);
    local(name: string): MemView;
    private(name: any): MemView;
    setMemory(memBuffer: MemoryArray): void;
}
declare const exportToJson: typeof MemoryMap.exportToJson;
export { MemoryMap, MemoryBrowser, MemoryCell, exportToJson, ProcessView, MemorySegmentName, };
