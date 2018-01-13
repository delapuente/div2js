import { assert } from 'chai';
import sinon from 'sinon';

import * as compiler from '../../src/compiler';
import * as loader from '../../src/loader';
import * as dbgr from '../../src/debugger';

function samplePath(name) {
  return '/base/tests/spec/samples/execution/' + name;
}

function get(path) {
  return fetch(path)
  .then(function (response) {
    if (response.status === 404) {
      throw new Error(path + ' does not exist.');
    }
    return response.text();
  });
}

function load(programName) {
  var programUrl = samplePath(programName);
  return get(programUrl)
    .then(function (src) {
      return compiler.compile(src);
    })
    .then(function (obj) {
      return loader.load(obj);
    });
}

function withDebugSession(callback) {
  return function () {
    var session = dbgr.debug(this);
    callback(session);
  };
}

function autoResume(callback) {
  return function (control) {
    var result = callback.call(this, control);
    if (result instanceof Promise) {
      result.then(function () { control.resume(); })
    }
    else {
      control.resume();
    };
  };
}

describe('Workflow of transpiled programs', function () {

  it('The empty program just finishes', function () {
    return load('empty-program.prg')
      .then(function (program) {
        return new Promise(function (fulfil) {
          program.onfinished = fulfil;
          program.run();
        });
      });
  });

  it('A program calling DEBUG, yields to debug, then finishes', function () {
    var debugSpy = sinon.spy();
    return load('debug-invocation.prg')
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

  it('A program calling DEBUG twice, yields to debug, resumes and finishes',
  function () {
    var program;
    var debugSpy = sinon.spy(function () {
      program.ondebug = autoResume(secondSpy);
    });
    var secondSpy = sinon.spy();
    return load('debug-resume.prg')
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

  it('Each process sets its own locals', function () {
    return load('locals.prg')
      .then(function (program) {
        return new Promise(function (fulfil) {
          program.onfinished = withDebugSession(function (session) {
            var aX = session.process({ index: 1 }).local('x').value;
            var bX = session.process({ index: 2 }).local('x').value;
            var cX = session.process({ index: 3 }).local('x').value;
            expect(aX).to.equal(1);
            expect(bX).to.equal(2);
            expect(cX).to.equal(3);
            fulfil();
          });
          program.run();
        });
      });
  });

  it('Process are reused ', function () {
    return load('process-reuse.prg')
      .then(function (program) {
        return new Promise(function (fulfil) {
          program.onfinished = withDebugSession(function (session) {
            var aX = session.process({ index: 1 }).local('x').value;
            var bX = session.process({ index: 2 }).local('x').value;
            var cX = session.process({ index: 3 }).local('x').value;
            expect(aX).to.equal(3);
            expect(bX).to.equal(0);
            expect(cX).to.equal(0);
            fulfil();
          });
          program.run();
        });
      });
  });

  it('A program creating a process, yields to process then returns ' +
      'to main program, then finishes', function () {
    return load('concurrency-1-process.prg')
      .then(function (program) {
        return new Promise(function (fulfil) {
          var results = [];
          var expected = [];
          program.ondebug = autoResume(withDebugSession(function (session) {
            results.push(
              session.global('text_z').value
            );
            expected.push(expected.length + 1);
          }));
          program.onfinished = function () {
            expect(results).to.deep.equal(expected);
            fulfil();
          };
          program.run();
        });
      });
  });

});

describe('Memory state while running transpiled programs', function () {

  it('Properly sets all initial values', function () {
    return load('initial-state.prg')
      .then(function (program) {
        return new Promise(function (fulfil, reject) {
          program.ondebug = autoResume(withDebugSession(function (session) {
            var program = session.process({ index: 0 });
            var programId = program.local('reserved.process_id').value;
            expect(programId).to.equal(program.id);
            expect(program.local('reserved.status').value).to.equal(2);
            expect(program.local('reserved.m8_object').value).to.equal(-1);
            expect(program.local('reserved.box_x1').value).to.equal(-1);
          }));
          program.onfinished = fulfil;
          program.run();
        });
      });
  });

  it('Properly handle privates', function () {
    return load('declare-privates.prg')
      .then(function (program) {
        return new Promise(function (fulfil, reject) {
          program.ondebug = autoResume(withDebugSession(function (session) {
            var program = session.process({ index: 0, type: 'declare_privates' });
            expect(program.private('private_var').value).to.equal(10);
          }));
          program.onfinished = fulfil;
          program.run();
        });
      });
  });

});