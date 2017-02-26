
define([], function () {

  function MemoryMap(symbols) {
    this.symbols = symbols;
    this.cells = Object.create(null);
    this._buildMap();
  }

  MemoryMap.prototype = {
    constructor: MemoryMap,

    ALIGNMENT: 4, // 4 bytes

    // TODO: Must take into account all DIV padding including program source
    GLOBAL_OFFSET: 0,

    SIZE_IN_BYTES: {
      'byte': 1,
      'word': 2,
      'int': 4
    },

    _buildMap: function () {
      this.cells.globals = this.symbols.globals.map(this._getCell, this);
      this.cells.locals = this.symbols.locals.map(this._getCell, this);
    },

    _getCell: function (symbol) {
      var cell = Object.create(symbol);
      cell.size = this._sizeOf(symbol);
      if (symbol.type === 'struct') {
        cell.fields = symbol.fields.map(this._getCell, this);
      }
      return cell;
    },

    _sizeOf: function (symbol) {
      var individualSize;
      if (symbol.type !== 'struct') {
        individualSize = this.SIZE_IN_BYTES[symbol.type];
      }
      else {
        individualSize = symbol.fields.reduce(function (partial, field) {
          return partial + this._sizeOf(field);
        }.bind(this), 0);
      }
      return individualSize * symbol.length;
    }
  };

  return {
    MemoryMap: MemoryMap
  };
});
