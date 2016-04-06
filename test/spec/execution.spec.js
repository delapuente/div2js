/* global fetch, assert, sinon */

define([
  '/src/compiler.js',
  '/src/loader.js',
  '/src/debugger.js'
], function (compiler, loader, dbgr) {
  'use strict';

  var context = newContext({
  });

  function samplePath(name) {
    return '/test/spec/samples/execution/' + name;
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
        console.log(obj);
        return loader.load(obj);
      });
  }

  function withDebugSession(callback) {
    return function (mem) {
      var session = dbgr.debug(mem);
      callback(session);
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
            program.ondebug = debugSpy;
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
      var secondSpy = sinon.spy();
      var debugSpy = sinon.spy(function () { program.ondebug = secondSpy; });
      return load('debug-resume.prg')
        .then(function (prg) {
          program = prg;
          return new Promise(function (fulfil) {
            program.ondebug = debugSpy;
            program.onfinished = fulfil;
            program.run();
          });
        })
        .then(function () {
          expect(secondSpy.calledAfter(debugSpy)).to.be.true;
        });
    });


    it('A program creating a process, yields to process then returns ' +
       'to main program, then finishes', function () {
      return load('concurrency-1-process.prg')
        .then(function (program) {
          return new Promise(function (fulfil) {
            var results = [];
            program.ondebug = withDebugSession(function (session) {
              results.push(session.seek(dbgr.symbols.G_ARGC).value);
            });
            program.onfinished = fulfil;
            program.run();
          });
        });
    });

  });

  describe('Memory state while running transpiled programs', function () {

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('Properly sets all initial values', function () {
      return load('initial-state.prg')
        .then(function (program) {
          return new Promise(function (fulfil, reject) {
            program.ondebug = withDebugSession(fulfil);
            program.onfinished = reject;
            program.run();
          });
        });
    });

  });
});
