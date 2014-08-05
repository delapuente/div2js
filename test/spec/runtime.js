
define([], function () {
  'use strict';

  var context = newContext();

  describe('src/runtime.js', function () {

    var runtime;

    beforeEach(function (done) {
      context(['src/runtime.js'], function (runtimeModule) {
        runtime = runtimeModule;
        done();
      });
    });

    describe('getRuntime() method', function () {

      it('Accepts a DIV2 program definition and returns a DIV2Runtime instance',
      function () {
        var testProgram = {
          program: 'test',
          process: {
            'test': function* (executionContext) { executionContext; }
          }
        };
        var programRuntime = runtime.getRuntime(testProgram);
        expect(programRuntime).to.be
          .an.instanceOf(runtime._internals.DIV2Runtime);
      });

    });

  });
});
