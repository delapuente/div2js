
define([], function () {
  'use strict';

  function DIV2Runtime(programDefinition) {
    programDefinition;
  }

  function getRuntime(programDefinition) {
    return new DIV2Runtime(programDefinition);
  }

  return {
    getRuntime: getRuntime,
    _internals: {
      DIV2Runtime: DIV2Runtime
    }
  };
});
