import { SymbolDefinition, DivSymbol, WellKnownSymbols } from "./definitions";
/**
 * The SymbolTable is a relation of all the variables and functions in the
 * program. It keeps information about the memory locations and semantics
 * of the program symbols.
 */
declare class SymbolTable {
    readonly globals: Array<DivSymbol>;
    readonly constants: Array<DivSymbol>;
    readonly locals: Array<DivSymbol>;
    readonly privates: Record<string, Array<DivSymbol>>;
    constructor(definitions: WellKnownSymbols);
    addGlobal(definition: SymbolDefinition | DivSymbol): DivSymbol;
    addLocal(definition: SymbolDefinition | DivSymbol): DivSymbol;
    isConstant(name: string): boolean;
    isGlobal(name: string): boolean;
    isLocal(name: string): boolean;
    addPrivate(processName: string, definition: SymbolDefinition | DivSymbol): DivSymbol;
    isPrivate(processName: string, name: string): boolean;
    isSomePrivate(name: string): boolean;
    _add(kind: "globals" | "locals" | "constants", definition: SymbolDefinition | DivSymbol): DivSymbol;
    _isKnown(kind: "globals" | "locals" | "constants", name: string): boolean;
}
export { SymbolTable };
