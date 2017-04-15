
define(['runtime/runtime'], function (runtime) {
  'use strict';

  function load(objText) {
    var unit = eval(objText)(runtime);
    var processMap = unit.pmap;
    var memoryMap = unit.mmap;
    var program = new runtime.Runtime(processMap, memoryMap);
    return Promise.resolve(program);
  }

  return {
    load: load
  };

});
