define([
  'context',
  'memory/symbols',
  'memory/mapper'
], function (ctx, symbols, mapper) {
  'use strict';

  function extractContext(div2ast) {
    var context = new ctx.Context();
    div2ast.processes.forEach(function (processAst) {
      context.declareProcess(processAst.name.name);
    });
    //TODO: Find and add custom globals to symbols
    //TODO: Find and add custom locals to symbols
    //TODO: Find and add privates to symbols
    var mmap = new mapper.MemoryMap(symbols);
    context.setMemoryMap(mmap);
    return context;
  }

  return {
    extractContext: extractContext
  };
});
