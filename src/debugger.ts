import * as mapper from "./memory/mapper";

function DebugSession(memBrowser, screen) {
  this._browser = memBrowser;
  this._screen = screen;
}

DebugSession.prototype = {
  constructor: DebugSession,

  get global() {
    return this._browser.global.bind(this._browser);
  },

  get process() {
    return this._browser.process.bind(this._browser);
  },

  get screen() {
    return this._screen;
  },
};

function debug(runtime) {
  return new DebugSession(
    runtime.getMemoryBrowser(),
    runtime.getSystem("video").screen
  );
}

export { DebugSession, debug };
