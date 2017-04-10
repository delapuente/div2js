
define(['memory/mapper'], function (mapper) {
  'use strict';

  function DebugSession(memBrowser) {
    this._browser = memBrowser;
  }

  DebugSession.prototype = {
    constructor: DebugSession,

    // TODO: It remains to add type info
    get: function (segment, name, base) {
      return this._browser.seek(this._browser.offset(segment, name, base));
    }
  };

  return {
    DebugSession: DebugSession,

    debug: function (runtime) {
      return new DebugSession(runtime.memoryBrowser);
    }
  };
});
