// To allow chai-like expressions, supressing the unused expressions error.
/* eslint-disable @typescript-eslint/no-unused-expressions */

import * as sinon from "sinon";
import { expect } from "chai";
import { load, withDebugSession, autoResume } from "./helpers";

const loadPrg = (programName) => load(samplePath(programName));

function samplePath(name) {
  return "/base/tests/spec/samples/execution/" + name;
}

describe("Workflow of transpiled programs", function () {
  it("The empty program just finishes", function () {
    return loadPrg("empty-program.prg").then(function (program) {
      return new Promise(function (fulfill) {
        program.onfinished = fulfill;
        program.start();
      });
    });
  });

  it("A program calling DEBUG, yields to debug, then finishes", function () {
    const debugSpy = sinon.spy();
    return loadPrg("debug-invocation.prg")
      .then(function (program) {
        return new Promise(function (fulfill) {
          program.ondebug = autoResume(debugSpy);
          program.onfinished = fulfill;
          program.start();
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
    return loadPrg("debug-resume.prg")
      .then(function (prg) {
        program = prg;
        return new Promise(function (fulfill) {
          program.ondebug = autoResume(debugSpy);
          program.onfinished = fulfill;
          program.start();
        });
      })
      .then(function () {
        expect(secondSpy.calledAfter(debugSpy)).to.be.true;
      });
  });

  it("Each process sets its own locals", function () {
    return loadPrg("locals.prg").then(function (program) {
      return new Promise(function (fulfill) {
        program.onfinished = withDebugSession(function (session) {
          const aX = session.process({ index: 1 }).local("x").value;
          const bX = session.process({ index: 2 }).local("x").value;
          const cX = session.process({ index: 3 }).local("x").value;
          expect(aX).to.equal(1);
          expect(bX).to.equal(2);
          expect(cX).to.equal(3);
          fulfill(void 0);
        });
        program.start();
      });
    });
  });

  it("Process are reused ", function () {
    return loadPrg("process-reuse.prg").then(function (program) {
      return new Promise(function (fulfill) {
        program.onfinished = withDebugSession(function (session) {
          const aX = session.process({ index: 1 }).local("x").value;
          const bX = session.process({ index: 2 }).local("x").value;
          const cX = session.process({ index: 3 }).local("x").value;
          expect(aX).to.equal(3);
          expect(bX).to.equal(0);
          expect(cX).to.equal(0);
          fulfill(void 0);
        });
        program.start();
      });
    });
  });

  it(
    "A program creating a process, yields to process then returns " +
      "to main program, then finishes",
    function () {
      return loadPrg("concurrency-1-process.prg").then(function (program) {
        return new Promise(function (fulfill) {
          const results = [] as any[];
          const expected = [] as any[];
          program.ondebug = autoResume(
            withDebugSession(function (session) {
              results.push(session.global("text_z").value);
              expected.push(expected.length + 1);
            }),
          );
          program.onfinished = function () {
            expect(results).to.deep.equal(expected);
            fulfill(void 0);
          };
          program.start();
        });
      });
    },
  );
});

describe("Memory state while running transpiled programs", function () {
  it("Properly sets all initial values", function () {
    return loadPrg("initial-state.prg").then(function (program) {
      return new Promise(function (fulfill) {
        program.ondebug = autoResume(
          withDebugSession(function (session) {
            const program = session.process({ index: 0 });
            const programId = program.local("reserved.process_id").value;
            expect(programId).to.equal(program.id);
            expect(program.local("reserved.status").value).to.equal(2);
            expect(program.local("reserved.m8_object").value).to.equal(-1);
            expect(program.local("reserved.box_x1").value).to.equal(-1);
          }),
        );
        program.onfinished = fulfill;
        program.start();
      });
    });
  });

  it("Properly handle privates", function () {
    return loadPrg("declare-privates.prg").then(function (program) {
      return new Promise(function (fulfill) {
        program.ondebug = autoResume(
          withDebugSession(function (session) {
            const program = session.process({
              index: 0,
              type: "declare_privates",
            });
            expect(program.private("private_var").value).to.equal(10);
          }),
        );
        program.onfinished = fulfill;
        program.start();
      });
    });
  });
});

describe("Math functions", function () {
  describe("rand()", function () {
    it("gives a random number between start and end", function () {
      return loadPrg("rand.prg").then(function (program) {
        return new Promise(function (fulfill) {
          program.onfinished = withDebugSession(function (session) {
            const program = session.process({
              index: 0,
              type: "_rand",
            });
            expect(program.private("random_value").value).to.be.within(0, 15);
            fulfill(void 0);
          });
          program.start();
        });
      });
    });
  });
});
