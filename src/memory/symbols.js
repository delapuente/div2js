
  function SymbolTable(definitions) {
    this.globals = definitions.wellKnownGlobals.map(SymbolTable._normalize);
    this.locals = definitions.wellKnownLocals.map(SymbolTable._normalize);
    this.privates = {};
  }

  SymbolTable._normalize = function (symbol) {
    if (typeof symbol === 'string') {
      symbol = { name: symbol };
    }
    var normalized = { name: symbol.name };
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
  };

  SymbolTable.prototype = {
    constructor: SymbolTable,

    addGlobal: function (definition) {
      return this._add('globals', definition);
    },

    addLocal: function (definition) {
      return this._add('locals', definition);
    },

    isGlobal: function (name) {
      return this._isKnown('globals', name.toLowerCase());
    },

    isLocal: function (name) {
      // TODO: Actually, id is a special token, non an identifier. Let's fix
      // that in the parser and translation module.
      return name === 'id' ||
             this._isKnown('locals', name.toLowerCase());
    },

    addPrivate: function (processName, definition) {
      var normalized = SymbolTable._normalize(definition);
      this.privates[processName] = this.privates[processName] || [];
      this.privates[processName].push(normalized);
      return normalized;
    },

    isPrivate: function (processName, name) {
      var processPrivates = this.privates[processName];
      return processPrivates && processPrivates.some(function (symbol) {
        return symbol.name === name;
      });
    },

    _add: function (kind, definition) {
      return (this[kind] = SymbolTable._normalize(definition));
    },

    _isKnown: function (kind, name) {
      return this[kind].some(function (symbol) {
        return symbol.name === name;
      });
    }
  };

  export {
    SymbolTable
  };