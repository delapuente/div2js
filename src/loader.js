
define(['runtime/runtime', 'systems/systems'], function (runtime, systems) {
  'use strict';

  function load(objText) {
    var unit = eval(objText)(runtime, systems);
    var processMap = unit.pmap;
    var memoryMap = unit.mmap;
    var program = new runtime.Runtime(processMap, memoryMap);
    //TODO: Let's think how to register new systems in a configurable way
    registerRenderSystem(program);
    return Promise.resolve(program);
  }

  function registerRenderSystem(program) {
    if (window && window.document) {
      var canvas = document.createElement('CANVAS');
      canvas.id = 'div-monitor';
      document.body.appendChild(canvas);
      program.registerSystem(new systems.DefaultRender(canvas));
    }
  }

  return {
    load: load
  };

});
