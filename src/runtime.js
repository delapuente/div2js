
define(['src/DIV2Process'], function (DIV2Process) {
  'use strict';

  function DIV2Runtime(programDefinition) {
    this._program = programDefinition;
    this._processList = [];
    this._processByPID = {};
    this._nextPID = 1;
    this._fps = 18;
    this._skip = 0;
  }

  DIV2Runtime.prototype.newProcess = function (processName) {
    var processes = this._program.processes || {};
    var processDefinition = processes[processName];
    if (!processDefinition) {
      throw new Error('missing-process-definition: ' + processName);
    }

    var pid = this._getPID();
    var args = Array.prototype.slice.call(arguments, 1);
    args = [processDefinition, pid].concat(args);

    var newProcess = Object.create(DIV2Process.prototype);
    DIV2Process.apply(newProcess, args);

    this._processList.push(newProcess);
    this._processByPID[pid] = newProcess;
    return pid;
  };

  DIV2Runtime.prototype.set_fps = function (fps, skip) {
    if (fps < 4 || fps > 200) {
      throw new Error('fps-out-of-range: valid range is [4, 200]');
    }
    if (skip < 0) {
      throw new Error('negative-skip-value');
    }

    this._fps = fps;
    this._skip = skip;
    this._rescheduleNextFrame(1000 / fps);
  };

  DIV2Runtime.prototype._rescheduleNextFrame = function (period) {
    clearTimeout(this._frameInterval);
    this._frameInterval = window.setTimeout(this._doFrame, period);
  };

  DIV2Runtime.prototype._doFrame = function () {};

  DIV2Runtime.prototype._getPID = function () {
    var pid = this._nextPID;
    this._nextPID += 2;
    return pid;
  };



  function getRuntime(programDefinition) {
    return new DIV2Runtime(programDefinition);
  }

  return {
    getRuntime: getRuntime,
    _internals: {
      DIV2Runtime: DIV2Runtime
    }
  };
});
