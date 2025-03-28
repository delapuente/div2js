import * as compiler from "../../src/compiler";
import * as linker from "../../src/linker";
import * as dbgr from "../../src/debugger";

function get(path) {
  return fetch(path).then(function (response) {
    if (response.status === 404) {
      throw new Error(path + " does not exist.");
    }
    return response.text();
  });
}

function link(programUrl) {
  return get(programUrl)
    .then(function (src) {
      return compiler.compile(src);
    })
    .then(function (obj) {
      const canvas = _ensureCanvas();
      return linker.link(obj, { rootUrl: "/base/demos/", canvas });
    });
}

function _ensureCanvas(): HTMLCanvasElement {
  if (!window || !window.document) {
    throw new Error("This test requires a browser environment.");
  }
  if (!document.querySelector("#div-screen")) {
    const canvas = document.createElement("CANVAS");
    canvas.id = "div-screen";
    canvas.style.imageRendering = "pixelated";
    canvas.style.cursor = "none";
    document.body.appendChild(canvas);
  }
  return document.querySelector("#div-screen") as HTMLCanvasElement;
}

function withDebugSession(callback: (session: dbgr.DebugSession) => void) {
  return function () {
    const session = dbgr.debug(this);
    callback(session);
  };
}

function autoResume(callback) {
  return function () {
    const result = callback.call(this, this);
    if (result instanceof Promise) {
      result.then(function () {
        this.resume();
      });
    } else {
      this.resume();
    }
  };
}

class MemoryBrowserMock {
  private readonly _globalStore: Record<string, { value: number }>;

  constructor() {
    this._globalStore = {};
  }

  global(path: string) {
    if (!(path in this._globalStore)) {
      this._globalStore[path] = { value: 0 };
    }
    return this._globalStore[path];
  }
}

class RuntimeMock {
  private readonly _memoryBrowser: MemoryBrowserMock;

  constructor() {
    this._memoryBrowser = new MemoryBrowserMock();
  }

  getMemoryBrowser() {
    return this._memoryBrowser;
  }
}

export { link, withDebugSession, autoResume, RuntimeMock };
