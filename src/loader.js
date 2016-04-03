
define(['runtime'], function (runtime) {
  'use strict';

  function load(objText) {
    var processMap = eval(objText)(runtime);
    var program = new runtime.Runtime(processMap);
    return Promise.resolve(program);
  }

  return {
    load: load
  };


});
