
define(['scheduler'], function (scheduler) {
  'use strict';

  function Runtime(processMap) {
    this._processMap = processMap;
  }

  Runtime.prototype = {
    constructor: Runtime,

    onfinished: undefined,

    ondebug: undefined,

    run: function () {
      this._mem = new Int32Array(1);
      this._scheduler = new scheduler.Scheduler(this._mem, {
        ondebug: this.ondebug,
        onfinished: this.onfinished
      });
      this._scheduler.addProcess(this._processMap.program);
      this._scheduler.run();
    }
  };

  function Baton(type, data) {
    data = data || {};
    this.type = type;
    Object.keys(data).forEach(function (key) {
      this[key] = data[key];
    }.bind(this));
  }

  return {
    Runtime: Runtime,
    Baton: Baton
  };
});
