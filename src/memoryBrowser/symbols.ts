import {
  SymbolDefinition,
  DivSymbol,
  WellKnownSymbols,
  normalize,
} from "./definitions";

/**
 * The SymbolTable is a relation of all the variables and functions in the
 * program. It keeps information about the memory locations and semantics
 * of the program symbols.
 */
// TODO: This should not be part of the memory browser. Notice constants are symbols but not memory cells.
class SymbolTable {
  readonly globals: Array<DivSymbol>;
  readonly constants: Array<DivSymbol>;
  readonly locals: Array<DivSymbol>;
  readonly privates: Record<string, Array<DivSymbol>>;

  constructor(definitions: WellKnownSymbols) {
    this.globals = Array.from(definitions.wellKnownGlobals);
    this.locals = Array.from(definitions.wellKnownLocals);
    this.constants = Array.from(definitions.wellKnownConstants);
    this.privates = {};
  }

  addGlobal(definition: SymbolDefinition | DivSymbol): DivSymbol {
    return this._add("globals", normalize(definition));
  }

  addLocal(definition: SymbolDefinition | DivSymbol): DivSymbol {
    return this._add("locals", normalize(definition));
  }

  isConstant(name: string): boolean {
    return this._isKnown("constants", name.toLowerCase());
  }

  isGlobal(name: string): boolean {
    return this._isKnown("globals", name.toLowerCase());
  }

  isLocal(name: string): boolean {
    // TODO: Actually, id is a special token, non an identifier. Let's fix
    // that in the parser and translation module.
    return name === "id" || this._isKnown("locals", name.toLowerCase());
  }

  addPrivate(
    processName: string,
    definition: SymbolDefinition | DivSymbol,
  ): DivSymbol {
    const normalized = normalize(definition);
    this.privates[processName] = this.privates[processName] || [];
    this.privates[processName].push(normalized);
    return normalized;
  }

  isPrivate(processName: string, name: string): boolean {
    const processPrivates = this.privates[processName];
    return (
      processPrivates &&
      processPrivates.some(function (symbol) {
        return symbol.name === name;
      })
    );
  }

  _add(
    kind: "globals" | "locals" | "constants",
    definition: SymbolDefinition | DivSymbol,
  ): DivSymbol {
    const normalized = normalize(definition);
    this[kind].push(normalized);
    return normalized;
  }

  _isKnown(kind: "globals" | "locals" | "constants", name: string): boolean {
    return this[kind].some(function (symbol) {
      return symbol.name === name;
    });
  }
}

export { SymbolTable };
