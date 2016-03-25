
define([], function () {
  'use strict';

  function Runtime(processMap) {
    this._processMap = processMap;
  }

  Runtime.prototype = {
    constructor: Runtime,

    onfinished: undefined,

    ondebug: undefined,

    run: function () {
      if (typeof this.onfinished === 'function') {
        this.onfinished();
      }
    }
  };

  return {
    Runtime: Runtime
  };
});
