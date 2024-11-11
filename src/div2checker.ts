import * as ctx from "./context";
import * as mapper from "./memoryBrowser/mapper";

function extractContext(div2ast, symbolTable) {
  if (div2ast.type !== "Unit") {
    console.warn("Extracting context from a partial AST.");
  }

  // Augment symbol table with custom symbols.
  // TODO: Should process names be added to the symbol table?
  // TODO: Find and add custom locals to symbols
  declareGlobals(symbolTable, div2ast.program);
  declarePrivates(symbolTable, [div2ast.program]);
  declarePrivates(symbolTable, div2ast.processes);

  const mmap = new mapper.MemoryMap(symbolTable);
  const context = new ctx.Context(symbolTable, mmap);
  declareProcesses(context, div2ast.processes);

  return context;
}

function declareProcesses(context, processes) {
  (processes || []).forEach(function (processAst) {
    context.declareProcess(processAst.name.name);
  });
}

function declareGlobals(symbolTable, program) {
  if (program && program.globals) {
    program.globals.declarations.forEach(function (declarationAst) {
      const varName = declarationAst.varName.name;
      if (!symbolTable.isGlobal(varName)) {
        symbolTable.addGlobal(definitionFromAst(declarationAst));
      } else {
        throw new Error(
          "The global " + varName + " has been already declared.",
        );
      }
    });
  }
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
            definitionFromAst(declarationAst),
          );
        } else {
          throw new Error(
            "The private " + varName + " has been already declared.",
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
