import { Runtime } from "./runtime/runtime";

function DebugSession(memBrowser, screen, framebuffer) {
  this._browser = memBrowser;
  this._screen = screen;
  this._framebuffer = framebuffer;
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

  get framebuffer() {
    return this._framebuffer;
  },
};

function debug(runtime: Runtime) {
  return new DebugSession(
    runtime.getMemoryBrowser(),
    (runtime.getSystem("video") as any).screen,
    (runtime.getSystem("video") as any).framebuffer,
  );
}

export { DebugSession, debug };
