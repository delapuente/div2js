define(['context'], function (ctx) {
  'use strict';

  function extractContext(div2ast) {
    var context = new ctx.Context();
    div2ast.processes.forEach(function (processAst) {
      context.declareProcess(processAst.name.name);
    });
    return context;
  }

  return {
    extractContext: extractContext
  };
});
