/* global fetch */

define([
  '/src/compiler.js',
  '/src/loader.js',
  '/src/debugger.js'
], function (compiler, loader, dbgr) {
  'use strict';

  var context = newContext({
  });

  describe('Memory state while running transpiled programs', function () {

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

    function loadAndDebug(programName) {
      var programUrl = samplePath(programName);
      return new Promise(function (fulfil, reject) {
        get(programUrl)
        .then(function (src) {
          return compiler.compile(src);
        })
        .then(function (obj) {
          console.log(obj);
          return loader.load(obj);
        })
        .then(function (prg) {
          prg.onfinished = function () {
            reject(new Error('Program finished without calling the debugger.'));
          };
          prg.ondebug = withDebugSession(fulfil);
          prg.run();
        })
        .catch(reject);
      });
    }

    function withDebugSession(callback) {
      return function (mem, exec) {
        var session = dbgr.debug(mem, exec);
        callback(session);
      };
    }

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('Properly set all initial values', function () {
      var sample = 'initial-state.prg';
      return loadAndDebug(sample)
        .then(function (dbg) {
          return Promise.resolve();
        });
    });

  });
});
