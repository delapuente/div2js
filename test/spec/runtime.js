
define([], function () {
  'use strict';

  var DIV2ProcessSpy = sinon.spy();

  var context = newContext({
    'src/DIV2Process': DIV2ProcessSpy
  });

  describe('src/runtime.js', function () {

    var runtime;
    var testProgram = {};

    function isProcessId(value) {
      return value % 2 === 1;
    }

    beforeEach(function (done) {
      DIV2ProcessSpy.reset();
      context(['src/runtime.js'], function (runtimeModule) {
        runtime = runtimeModule;
        done();
      });
    });

    describe('getRuntime() method', function () {

      it('accepts a DIV2 program definition and returns a DIV2Runtime ' +
         'instance.',
      function () {
        var programRuntime = runtime.getRuntime(testProgram);
        expect(programRuntime).to.be
          .an.instanceOf(runtime._internals.DIV2Runtime);
      });

    });

    describe('Runtime#newProcess() method', function () {

      var rtInstance;
      var testProgram = {
        processes: {
          testProcess: {}
        }
      };

      beforeEach(function () {
        rtInstance = runtime.getRuntime(testProgram);
        expect(rtInstance.newProcess).to.be.a('function');
      });

      it('creates a new process returning its process id.',
      function () {
        var pid = rtInstance.newProcess('testProcess');
        expect(pid).to.satisfy(isProcessId);
        expect(rtInstance._processList.length).to.equal(1);
        expect(rtInstance._processList[0]).to.be.an.instanceOf(DIV2ProcessSpy);
      });

      it('accepts extra parameters after the name of the process that will ' +
         'be passed to the process constructor.',
      function () {
        var testParameter = {};
        rtInstance.newProcess('testProcess', testParameter);
        expect(rtInstance._processList[0]).to.be.an.instanceOf(DIV2ProcessSpy);
        expect(DIV2ProcessSpy.getCall(0).args[2]).to.equal(testParameter);
      });

      it('throw an exception if the process definition does not exists.',
      function () {
        var newProcess = function () {
          rtInstance.newProcess('missingProcess');
        };
        expect(newProcess).to.throw(/missing-process/);
      });

    });

    describe('Runtime#set_fps() method', function () {

      var rtInstance;

      beforeEach(function () {
        rtInstance = runtime.getRuntime(testProgram);
        expect(rtInstance.set_fps).to.be.a('function');
      });

      it('throw an exception if FPS is set below 4.',
      function () {
        var badCall = function () {
          rtInstance.set_fps(3);
        };
        var goodCall = function () {
          rtInstance.set_fps(4);
        };
        expect(badCall).to.throw(/fps-out-of-range/);
        expect(goodCall).to.not.throw();
      });

      it('throw an exception if FPS is above 200.',
      function () {
        var badCall = function () {
          rtInstance.set_fps(201);
        };
        var goodCall = function () {
          rtInstance.set_fps(200);
        };
        expect(badCall).to.throw(/fps-out-of-range/);
        expect(goodCall).to.not.throw();
      });

    });

    describe('Runtime#_rescheduleNextFrame() method', function () {

      var clock;
      var rtInstance;

      beforeEach(function () {
        clock = sinon.useFakeTimers();
        rtInstance = runtime.getRuntime(testProgram);
        expect(rtInstance._rescheduleNextFrame).to.be.a('function');
      });

      afterEach(function () {
        clock.restore();
      });

      it('schedule next frame in period ms.',
      function () {
        var period = 250;
        sinon.spy(rtInstance, '_doFrame');
        rtInstance._rescheduleNextFrame(period);
        clock.tick(period);
        expect(rtInstance._doFrame.calledOnce).to.be.true;
      });

    });

  });
});
