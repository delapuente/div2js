import * as compiler from "../../src/compiler";
import * as loader from "../../src/loader";
import * as dbgr from "../../src/debugger";

function get(path) {
  return fetch(path).then(function (response) {
    if (response.status === 404) {
      throw new Error(path + " does not exist.");
    }
    return response.text();
  });
}

function load(programUrl) {
  return get(programUrl)
    .then(function (src) {
      return compiler.compile(src);
    })
    .then(function (obj) {
      return loader.load(obj, { rootUrl: "/base/demos/" });
    });
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

export { load, withDebugSession, autoResume, RuntimeMock };
