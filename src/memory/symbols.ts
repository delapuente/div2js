  class SymbolTable {

    globals;

    locals;

    privates;

    constructor(definitions) {
      this.globals = definitions.wellKnownGlobals.map(SymbolTable._normalize);
      this.locals = definitions.wellKnownLocals.map(SymbolTable._normalize);
      this.privates = {};
    }

    addGlobal(definition) {
      return this._add('globals', definition);
    }

    addLocal(definition) {
      return this._add('locals', definition);
    }

    isGlobal(name) {
      return this._isKnown('globals', name.toLowerCase());
    }

    isLocal(name) {
      //TODO: Actually, id is a special token, non an identifier. Let's fix
      // that in the parser and translation module.
      return name === 'id' ||
             this._isKnown('locals', name.toLowerCase());
    }

    addPrivate(processName, definition) {
      var normalized = SymbolTable._normalize(definition);
      this.privates[processName] = this.privates[processName] || [];
      this.privates[processName].push(normalized);
      return normalized;
    }

    isPrivate(processName, name) {
      var processPrivates = this.privates[processName];
      return processPrivates && processPrivates.some(function (symbol) {
        return symbol.name === name;
      });
    }

    _add(kind, definition) {
      return (this[kind] = SymbolTable._normalize(definition));
    }

    _isKnown(kind, name) {
      return this[kind].some(function (symbol) {
        return symbol.name === name;
      });
    }

    static _normalize(symbol) {
      if (typeof symbol === 'string') {
        symbol = { name: symbol };
      }
      var normalized: { [others: string]: any } = {};
      normalized.name = symbol.name;
      if (!normalized.name) {
        throw new Error('Symbol has no name!');
      }
      normalized.hidden = symbol.hidden || false;
      normalized.type = (symbol.type || 'int').toLowerCase();
      normalized.length = symbol.length || 1;
      if (symbol.type === 'struct') {
        if (!symbol.fields || !symbol.fields.length) {
          throw new Error('Bad struct definition:' + symbol.name +
                          '. Struct with no fields.');
        }
        normalized.fields = symbol.fields.map(SymbolTable._normalize);
      }
      else {
        normalized.default = symbol.default || 0;
      }
      return normalized;
    }
  };

  export {
    SymbolTable
  };