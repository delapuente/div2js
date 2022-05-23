import { ShortSymbol, DivSymbol, Definitions, normalize } from "./definitions";

/**
 * The SymbolTable is a relation of all the variables and functions in the
 * program. It keeps information about the memory locations and semantics
 * of the program symbols.
 */
class SymbolTable {
  readonly globals: Array<DivSymbol>;
  readonly locals: Array<DivSymbol>;
  readonly privates: Record<string, Array<DivSymbol>>;

  constructor(definitions: Definitions) {
    this.globals = definitions.wellKnownGlobals;
    this.locals = definitions.wellKnownLocals;
    this.privates = {};
  }

  addGlobal(definition: ShortSymbol | DivSymbol): DivSymbol {
    return this._add("globals", normalize(definition));
  }

  addLocal(definition: ShortSymbol | DivSymbol): DivSymbol {
    return this._add("locals", normalize(definition));
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
    definition: ShortSymbol | DivSymbol
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
    kind: "globals" | "locals",
    definition: ShortSymbol | DivSymbol
  ): DivSymbol {
    const normalized = normalize(definition);
    this[kind].push(normalized);
    return normalized;
  }

  _isKnown(kind: "globals" | "locals", name: string): boolean {
    return this[kind].some(function (symbol) {
      return symbol.name === name;
    });
  }
}

export { SymbolTable };
