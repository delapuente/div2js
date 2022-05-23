import { ShortCell, Cell, Definitions, normalizeCell } from "./definitions";

class SymbolTable {
  readonly globals: Array<Cell>;
  readonly locals: Array<Cell>;
  readonly privates: Record<string, Array<Cell>>;

  constructor(definitions: Definitions) {
    this.globals = definitions.wellKnownGlobals;
    this.locals = definitions.wellKnownLocals;
    this.privates = {};
  }

  addGlobal(definition: ShortCell | Cell): Cell {
    return this._add("globals", normalizeCell(definition));
  }

  addLocal(definition: ShortCell | Cell): Cell {
    return this._add("locals", normalizeCell(definition));
  }

  isGlobal(name: string): boolean {
    return this._isKnown("globals", name.toLowerCase());
  }

  isLocal(name: string): boolean {
    // TODO: Actually, id is a special token, non an identifier. Let's fix
    // that in the parser and translation module.
    return name === "id" || this._isKnown("locals", name.toLowerCase());
  }

  addPrivate(processName: string, definition: ShortCell | Cell): Cell {
    const normalized = normalizeCell(definition);
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

  _add(kind: "globals" | "locals", definition: ShortCell | Cell): Cell {
    const normalized = normalizeCell(definition);
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
