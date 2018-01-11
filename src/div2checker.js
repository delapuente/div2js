define([
  'context',
  'memory/mapper'
], function (ctx, mapper) {
  'use strict';

  function extractContext(div2ast, symbolTable) {
    if (div2ast.type !== 'Unit') {
      console.warn('Extracting context from a partial AST.');
    }

    var context = new ctx.Context();
    declareProcesses(context, div2ast.processes);
    //TODO: Find and add custom globals to symbols
    //TODO: Find and add custom locals to symbols
    declarePrivates(symbolTable, [div2ast.program]);
    declarePrivates(symbolTable, div2ast.processes);

    var mmap = new mapper.MemoryMap(symbolTable);
    context.setMemoryMap(mmap);

    return context;
  }

  function declareProcesses(context, processes) {
    (processes || []).forEach(function (processAst) {
      context.declareProcess(processAst.name.name);
    });
  }

  function declarePrivates(symbolTable, processes) {
    (processes || []).forEach(function (processAst) {
      if (processAst && processAst.privates) {
        processAst.privates.declarations.forEach(function (declarationAst) {
          var processName = processAst.name.name;
          symbolTable.addPrivate(
            processName,
            definitionFromAst(declarationAst)
          );
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
