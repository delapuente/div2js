import * as ctx from "./context";
import { SymbolTable } from "./memoryBrowser/symbols";

class NameIsNotNewError extends Error {
  constructor(
    public readonly name: string,
    public readonly scope: ctx.Scope,
    public readonly process?: string,
  ) {
    super(`The name \`${name}\` is not new.`);
  }
}

function extractContext(div2ast, symbolTable: SymbolTable): ctx.Context {
  if (div2ast.type !== "Unit") {
    console.warn("Extracting context from a partial AST.");
  }

  const context = new ctx.Context(symbolTable);
  declareNames(context, div2ast);
  context.calculateMemoryMap();
  return context;
}

function declareNames(context: ctx.Context, div2ast) {
  if (div2ast.program) {
    declareProcess(context, div2ast.program);
    declareGlobals(context, div2ast.program);
    declareLocals(context, div2ast.program);
    declarePrivates(context, div2ast.program);
  }
  (div2ast.processes ?? []).forEach((processAst) => {
    declareProcess(context, processAst);
    declarePrivates(context, processAst);
  });

  return context;
}

function declareProcess(context, processAst) {
  const processName = processAst.name.name;

  if (
    !context.isSomeGlobalName(processName) &&
    !context.isSomePrivate(processName)
  ) {
    context.declareProcess(processName);
  } else {
    throw new NameIsNotNewError(processName, "global", processName);
  }
}

function declareGlobals(context: ctx.Context, program) {
  if (program && program.globals) {
    program.globals.declarations.forEach(function (declarationAst) {
      const varName = declarationAst.varName.name;
      if (!context.isSomeGlobalName(varName)) {
        context.declareGlobal(definitionFromAst(declarationAst));
      } else {
        throw new NameIsNotNewError(varName, "global");
      }
    });
  }
}

function declareLocals(context: ctx.Context, program) {
  if (program && program.locals) {
    program.locals.declarations.forEach(function (declarationAst) {
      const varName = declarationAst.varName.name;
      if (!context.isSomeGlobalName(varName)) {
        context.declareLocal(definitionFromAst(declarationAst));
      } else {
        throw new NameIsNotNewError(varName, "local");
      }
    });
  }
}

function declarePrivates(context: ctx.Context, processAst) {
  const processName = processAst.name.name;

  // Extract privates from parameters.
  const parameters = (processAst.params ?? []).map(
    (identifier) => identifier.name,
  );
  const parameterPrivates = parameters.filter((paramName) => {
    return !context.isSomeGlobalName(paramName);
  });
  parameterPrivates.forEach(function (privateName) {
    if (!context.isPrivate(processName, privateName)) {
      context.declarePrivate(processName, privateName);
    }
    // XXX: Declaring in parameters allows for the repetition of a private
    // name without throwing an error.
  });

  // Extract privates from explicit declarations.
  if (processAst && processAst.privates) {
    processAst.privates.declarations.forEach(function (declarationAst) {
      const varName = declarationAst.varName.name;
      if (
        !context.isSomeGlobalName(varName) &&
        !context.isPrivate(processName, varName)
      ) {
        context.declarePrivate(processName, definitionFromAst(declarationAst));
      }
      // XXX: Declaring in parameters allows for the repetition of a private
      // name without throwing an error.
      else if (!parameterPrivates.includes(varName)) {
        throw new NameIsNotNewError(varName, "private", processName);
      }
    });
  }
}

function definitionFromAst(declarationAst) {
  // TODO: add support for structs and arrays.
  return {
    name: declarationAst.varName.name,
    type: declarationAst.varType,
  };
}

export { extractContext, NameIsNotNewError };
