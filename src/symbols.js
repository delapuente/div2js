
define(['symbolDefinitions'], function (symbolDefinitions) {
  'use strict';

  return {
    isGlobal: function (name) {
      return this._isWellKnown('wellKnownGlobals', name.toLowerCase());
    },

    isLocal: function (name) {
      // TODO: Actually, id is a special token, non an identifier. Let's fix
      // that in the parser and translation module.
      return name === 'id' ||
             this._isWellKnown('wellKnownLocals', name.toLowerCase());
    },

    _isWellKnown: function (kind, name) {
      var collection = this[kind] || [];
      for (var i = 0, symbol; symbol = collection[i]; i++) {
        if (typeof symbol === 'string' && symbol === name ||
            typeof symbol === 'object' && symbol.name === name ) {
          return true;
        }
      }
      return false;
    },

    wellKnownGlobals: symbolDefinitions.wellKnownGlobals.map(normalize),

    wellKnownLocals: symbolDefinitions.wellKnownLocals.map(normalize)
  };

  function normalize(symbol) {
    var normalized = {};
    if (typeof symbol === 'string') {
      normalized.name = symbol;
    }
    if (!normalized.name) {
      throw new Error('Symbol has no name!');
    }
    normalized.type = symbol.type || 'int';
    normalized.length = symbol.length || 1;
    normalized.offset = computeOffset(normalized);
    return normalized;
  }
});
