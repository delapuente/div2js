
define([], function () {
  'use strict';

  function DebugSession(mem) {
    this._mem = mem;
  }

  return {
    DebugSession: DebugSession,

    debug: function (mem) {
      return new DebugSession(mem);
    }
  };
});
