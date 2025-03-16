import { MemoryBrowser } from "./memoryBrowser/mapper";
import { Runtime } from "./runtime/runtime";

interface ScreenData {
  width: number;
  height: number;
}

class DebugSession {
  private _browser: MemoryBrowser;
  private _screenData: ScreenData;
  private _framebuffer: Uint8Array;

  constructor(
    memBrowser: MemoryBrowser,
    screenData: ScreenData,
    framebuffer: Uint8Array,
  ) {
    this._browser = memBrowser;
    this._screenData = screenData;
    this._framebuffer = framebuffer;
  }

  get global() {
    return this._browser.global.bind(this._browser);
  }

  get process() {
    return this._browser.process.bind(this._browser);
  }

  get framebuffer() {
    return this._framebuffer;
  }

  get screenData() {
    return this._screenData;
  }
}

function debug(runtime: Runtime) {
  return new DebugSession(
    runtime.getMemoryBrowser(),
    {
      width: runtime.getVideoSystem().screenWidth,
      height: runtime.getVideoSystem().screenHeight,
    },
    runtime.getVideoSystem().framebuffer,
  );
}

export { DebugSession, debug };
