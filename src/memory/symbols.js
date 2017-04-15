
define(['memory/definitions'], function (definitions) {
  'use strict';

  function normalize(symbol) {
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
      normalized.fields = symbol.fields.map(normalize);
    }
    else {
      normalized.default = symbol.default || 0;
    }
    return normalized;
  }

  // XXX: Not sure if this should be a singleton.
  return {
    globals: definitions.wellKnownGlobals.map(normalize),

    locals: definitions.wellKnownLocals.map(normalize),

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

    _add: function (kind, definition) {
      return (this[kind] = this._normalize(definition));
    },

    _normalize: normalize,

    _isKnown: function (kind, name) {
      return this[kind].some(function (symbol) {
        return symbol.name === name;
      });
    }
  };
});
