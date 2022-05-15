import * as sinon from "sinon";

import * as compiler from "../../src/compiler";
import * as loader from "../../src/loader";
import * as dbgr from "../../src/debugger";
import { expect } from "chai";

function samplePath(name) {
  return "/base/tests/spec/samples/execution/" + name;
}

function get(path) {
  return fetch(path).then(function (response) {
    if (response.status === 404) {
      throw new Error(path + " does not exist.");
    }
    return response.text();
  });
}

function load(programName) {
  const programUrl = samplePath(programName);
  return get(programUrl)
    .then(function (src) {
      return compiler.compile(src);
    })
    .then(function (obj) {
      return loader.load(obj, { rootUrl: "/base/demos/" });
    });
}

function withDebugSession(callback) {
  return function () {
    const session = dbgr.debug(this);
    callback(session);
  };
}

function autoResume(callback) {
  return function (control) {
    const result = callback.call(this, control);
    if (result instanceof Promise) {
      result.then(function () {
        control.resume();
      });
    } else {
      control.resume();
    }
  };
}

describe("Workflow of transpiled programs", function () {
  it("The empty program just finishes", function () {
    return load("empty-program.prg").then(function (program) {
      return new Promise(function (fulfil) {
        program.onfinished = fulfil;
        program.run();
      });
    });
  });

  it("A program calling DEBUG, yields to debug, then finishes", function () {
    const debugSpy = sinon.spy();
    return load("debug-invocation.prg")
      .then(function (program) {
        return new Promise(function (fulfil) {
          program.ondebug = autoResume(debugSpy);
          program.onfinished = fulfil;
          program.run();
        });
      })
      .then(function () {
        expect(debugSpy.calledOnce).to.be.true;
      });
  });

  it("A program calling DEBUG twice, yields to debug, resumes and finishes", function () {
    let program;
    const secondSpy = sinon.spy();
    const debugSpy = sinon.spy(function () {
      program.ondebug = autoResume(secondSpy);
    });
    return load("debug-resume.prg")
      .then(function (prg) {
        program = prg;
        return new Promise(function (fulfil) {
          program.ondebug = autoResume(debugSpy);
          program.onfinished = fulfil;
          program.run();
        });
      })
      .then(function () {
        expect(secondSpy.calledAfter(debugSpy)).to.be.true;
      });
  });

  it("Each process sets its own locals", function () {
    return load("locals.prg").then(function (program) {
      return new Promise(function (fulfil) {
        program.onfinished = withDebugSession(function (session) {
          const aX = session.process({ index: 1 }).local("x").value;
          const bX = session.process({ index: 2 }).local("x").value;
          const cX = session.process({ index: 3 }).local("x").value;
          expect(aX).to.equal(1);
          expect(bX).to.equal(2);
          expect(cX).to.equal(3);
          fulfil(void 0);
        });
        program.run();
      });
    });
  });

  it("Process are reused ", function () {
    return load("process-reuse.prg").then(function (program) {
      return new Promise(function (fulfil) {
        program.onfinished = withDebugSession(function (session) {
          const aX = session.process({ index: 1 }).local("x").value;
          const bX = session.process({ index: 2 }).local("x").value;
          const cX = session.process({ index: 3 }).local("x").value;
          expect(aX).to.equal(3);
          expect(bX).to.equal(0);
          expect(cX).to.equal(0);
          fulfil(void 0);
        });
        program.run();
      });
    });
  });

  it(
    "A program creating a process, yields to process then returns " +
      "to main program, then finishes",
    function () {
      return load("concurrency-1-process.prg").then(function (program) {
        return new Promise(function (fulfil) {
          const results = [] as any[];
          const expected = [] as any[];
          program.ondebug = autoResume(
            withDebugSession(function (session) {
              results.push(session.global("text_z").value);
              expected.push(expected.length + 1);
            })
          );
          program.onfinished = function () {
            expect(results).to.deep.equal(expected);
            fulfil(void 0);
          };
          program.run();
        });
      });
    }
  );
});

describe("Memory state while running transpiled programs", function () {
  it("Properly sets all initial values", function () {
    return load("initial-state.prg").then(function (program) {
      return new Promise(function (fulfil, reject) {
        program.ondebug = autoResume(
          withDebugSession(function (session) {
            const program = session.process({ index: 0 });
            const programId = program.local("reserved.process_id").value;
            expect(programId).to.equal(program.id);
            expect(program.local("reserved.status").value).to.equal(2);
            expect(program.local("reserved.m8_object").value).to.equal(-1);
            expect(program.local("reserved.box_x1").value).to.equal(-1);
          })
        );
        program.onfinished = fulfil;
        program.run();
      });
    });
  });

  it("Properly handle privates", function () {
    return load("declare-privates.prg").then(function (program) {
      return new Promise(function (fulfil, reject) {
        program.ondebug = autoResume(
          withDebugSession(function (session) {
            const program = session.process({
              index: 0,
              type: "declare_privates",
            });
            expect(program.private("private_var").value).to.equal(10);
          })
        );
        program.onfinished = fulfil;
        program.run();
      });
    });
  });
});

describe("Math functions", function () {
  describe("rand()", function () {
    it("gives a random number between start and end", function () {
      return load("rand.prg").then(function (program) {
        return new Promise(function (fulfil) {
          program.onfinished = withDebugSession(function (session) {
            const program = session.process({
              index: 0,
              type: "_rand",
            });
            expect(program.private("random_value").value).to.be.within(0, 15);
            fulfil(void 0);
          });
          program.run();
        });
      });
    });
  });
});

describe("Graphic functions", function () {
  describe("default video mode", function () {
    it("is m320x200", function () {
      return load("default-video-mode.prg").then(function (program) {
        return new Promise(function (fulfil) {
          program.onfinished = withDebugSession(function (session) {
            const screen = session.screen;
            expect(screen.width).to.equal(320);
            expect(screen.height).to.equal(200);
            expect(screen.buffer.length).to.equal(320 * 200);
            fulfil(void 0);
          });
          program.run();
        });
      });
    });
  });

  describe("put_pixel()", function () {
    it("sets a pixel to a given color", function () {
      return load("put_pixel.prg").then(function (program) {
        return new Promise(function (fulfil) {
          program.onfinished = withDebugSession(function (session) {
            const screen = session.screen;
            const pixelIndex = 99 * 320 + 159;
            expect(screen.buffer[pixelIndex]).to.equal(15);
            fulfil(void 0);
          });
          program.run();
        });
      });
    });
  });

  describe("load_pal()", function () {
    it("loads and set a palette", function () {
      return load("load_pal.prg").then(function (program) {
        return new Promise(function (fulfil) {
          program.onfinished = withDebugSession(function (session) {
            const program = session.process({
              index: 0,
              type: "_load_pal",
            });
            expect(program.private("palette_1").value).to.equal(1);
            expect(program.private("palette_2").value).to.equal(1);
            fulfil(void 0);
          });
          program.run();
        });
      });
    });

    it("errors when trying to load a non existent palette", function () {
      return load("load_pal_error.prg").then(function (program) {
        return new Promise(function (fulfil, reject) {
          program.onfinished = () =>
            reject(new Error("Should not have finished but errored, instead."));
          program.onerror = (error) => {
            expect(error.errorCode).to.equal(102);
            fulfil(void 0);
          };
          program.run();
        });
      });
    });
  });
});
