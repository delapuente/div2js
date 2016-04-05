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

  describe('Workflow', function () {

    it('Finishes', function () {
      return load('empty-program.prg')
        .then(function (program) {
          return new Promise(function (fulfil) {
            program.onfinished = fulfil;
            program.run();
          });
        });
    });

    it('Starts a debug session when invoked', function () {
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
