import * as ctx from "./context";
import * as mapper from "./memoryBrowser/mapper";

function extractContext(div2ast, symbolTable) {
  if (div2ast.type !== "Unit") {
    console.warn("Extracting context from a partial AST.");
  }

  const context = new ctx.Context();
  declareProcesses(context, div2ast.processes);
  // TODO: Find and add custom globals to symbols
  // TODO: Find and add custom locals to symbols
  declarePrivates(symbolTable, [div2ast.program]);
  declarePrivates(symbolTable, div2ast.processes);

  const mmap = new mapper.MemoryMap(symbolTable);
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
        const processName = processAst.name.name;
        const varName = declarationAst.varName.name;
        if (!symbolTable.isPrivate(processName, varName)) {
          symbolTable.addPrivate(
            processName,
            definitionFromAst(declarationAst)
          );
        } else {
          throw new Error(
            "The private " + varName + " has been already declared."
          );
        }
      });
    }
  });
}

function definitionFromAst(declarationAst) {
  // TODO: add support for structs and arrays.
  return {
    name: declarationAst.varName.name,
    type: declarationAst.varType,
  };
}

export { extractContext };
