define([
  'context',
  'memory/symbols',
  'memory/mapper'
], function (ctx, symbols, mapper) {
  'use strict';

  function extractContext(div2ast) {
    var context = new ctx.Context();
    declareProcesses(context, div2ast.processes);
    //TODO: Find and add custom globals to symbols
    //TODO: Find and add custom locals to symbols
    declarePrivates([div2ast.program]);
    declarePrivates(div2ast.processes);

    var mmap = new mapper.MemoryMap(symbols);
    context.setMemoryMap(mmap);
    return context;
  }

  function declareProcesses(context, processes) {
    processes.forEach(function (processAst) {
      context.declareProcess(processAst.name.name);
    });
  }

  function declarePrivates(processes) {
    processes.forEach(function (processAst) {
      if (processAst.privates) {
        processAst.privates.declarations.forEach(function (declarationAst) {
          var processName = processAst.name.name;
          symbols.addPrivate(processName, definitionFromAst(declarationAst));
        });
      }
    });
  }

  function definitionFromAst(declarationAst) {
    //TODO: add support for structs and arrays. 
    return {
      name: declarationAst.varName.name,
      type: declarationAst.varType
    };
  }

  return {
    extractContext: extractContext
  };
});
