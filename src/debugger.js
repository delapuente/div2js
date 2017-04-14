
define(['memory/mapper'], function (mapper) {
  'use strict';

  function DebugSession(memBrowser) {
    this._browser = memBrowser;
  }

  DebugSession.prototype = {
    constructor: DebugSession,

    get global() {
      return this._browser.global.bind(this._browser);
    },

    get process() {
      return this._browser.process.bind(this._browser);
    }
  };

  return {
    DebugSession: DebugSession,

    debug: function (runtime) {
      return new DebugSession(runtime.memoryBrowser);
    }
  };
});
