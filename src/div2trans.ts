import * as ast from "./ast";
import t from "./templates";

const translators = Object.create(null);

// TODO: Consider switching these to MemoryBrowser-based assignment and read
// so the JS code can be optimized and inlined later. This would decouple
// translation from memory layout.
translators.AssignmentExpression = function (divAssignment, context) {
  return new ast.AssignmentExpression(
    translate(divAssignment.left, context),
    translate(divAssignment.right, context),

    // XXX: This is good luck. All assignment operators are equal!
    divAssignment.operator
  );
};

translators.UnaryExpression = function (divUnary, context) {
  if (divUnary.operator === "+" || divUnary.operator === "-") {
    return new ast.UnaryExpression(
      translate(divUnary.argument, context),
      divUnary.operator
    );
  }

  let unaryFunction;
  switch (divUnary.operator) {
    case "&":
      unaryFunction = "__offset";
      break;
    case "*":
      unaryFunction = "__deref";
      break;
    case "!":
      unaryFunction = "__not";
      break;
    default:
      throw new Error("Unary operator unknown: " + divUnary.operator);
  }
  return t.callWith(unaryFunction, [translate(divUnary.argument, context)]);
}

translators.BinaryExpression = function (divBinary, context) {
  return new ast.BinaryExpression(
    translate(divBinary.left, context),
    translate(divBinary.right, context),
    divBinary.operator
  );
};

translators.RelationalExpression = translators.BinaryExpression;

translators.LogicalExpression = function (divLogical, context) {
  let logicalFunction;
  switch (divLogical.operator) {
    case "&":
    case "&&":
      logicalFunction = "__and";
      break;
    case "||":
      logicalFunction = "__or";
      break;
    case "^":
    case "^^":
      logicalFunction = "__xor";
      break;
    default:
      throw new Error("Logical operator unknown: " + divLogical.operator);
  }
  return t.callWith(logicalFunction, [
    translate(divLogical.left, context),
    translate(divLogical.right, context),
  ]);
};

translators.CallExpression = function (divCall, context) {
  const parameters = new ast.ArrayExpression(
    divCall.arguments.map(function (arg) {
      return translate(arg, context);
    })
  );
  const id = divCall.callee.name;
  const isProcess = context.isProcess(id);
  const afterCallLabel = context.newLabel();
  const callKind = isProcess ? "newProcess" : "callFunction";
  // Isolate as a subexpression (impicitely stored in the results queue)
  context[callKind](afterCallLabel, id, parameters);
  context.label(afterCallLabel);
  // Replace by the intermediate value (i.e. dequeue from the results queue)
  return t.dequeueReturnValue;
};

translators.CloneSentence = function (divClone, context) {
  const insideCloneLabel = context.newLabel();
  const afterCloneLabel = context.newLabel();
  context.clone(insideCloneLabel, afterCloneLabel);
  context.label(insideCloneLabel);
  translateBody(divClone, context);
  context.label(afterCloneLabel);
};

translators.Unit = function (divUnit, context) {
  const programFunction = translate(divUnit.program, context);
  const processesFunctions = divUnit.processes.map(function (divProcess) {
    return translate(divProcess, context);
  });
  const globals = translateGlobals(context);
  const locals = translateLocals(context);
  const privateOffset = createPrivateOffset(context);
  return new ast.Program(
    [globals, locals, privateOffset]
      .concat([programFunction])
      .concat(processesFunctions)
  );
};

function translateGlobals(context) {
  const globalBase = getGlobalBaseDeclaration(context);
  const globalDeclarations = translateSegment("globals", context);
  globalDeclarations.declarations.unshift(globalBase);
  return globalDeclarations;
}

function translateLocals(context) {
  return translateSegment("locals", context);
}

function createPrivateOffset(context) {
  const mmap = context.getMemoryMap();
  return new ast.VariableDeclaration([
    new ast.VariableDeclarator(
      new ast.Identifier("P_OFFSET"),
      ast.Literal["for"](mmap.localSegmentSize)
    ),
  ]);
}

function getGlobalBaseDeclaration(context) {
  const offset = context.getMemoryMap().constructor.GLOBAL_OFFSET;
  return new ast.VariableDeclarator(
    t.globalBaseIdentifier,
    ast.Literal["for"](offset)
  );
}

function translateSegment(segment, context) {
  const mmap = context.getMemoryMap();
  const vars = getSegmentDeclarations(segment, [], mmap.segments[segment]);
  return new ast.VariableDeclaration(vars);
}

function getSegmentDeclarations(segment, prefixes, cells) {
  let definitions = [];
  for (let i = 0, l = cells.length; i < l; i++) {
    const cell = cells[i];
    if (!cell.symbol.hidden) {
      const identifierFactory =
        "identifierFor" +
        {
          globals: "Global",
          locals: "Local",
          privates: "Private",
        }[segment];
      prefixes.push(cell.symbol.name);
      definitions.push(
        new ast.VariableDeclarator(
          t[identifierFactory](prefixes),
          ast.Literal["for"](cell.offset)
        )
      );
      if (cell.symbol.type === "struct") {
        definitions = definitions.concat(
          getSegmentDeclarations(segment, prefixes, cell.fields)
        );
      }
      prefixes.pop();
    }
  }
  return flat(definitions);

  function flat(list) {
    return list.reduce(function (flat, item) {
      if (!Array.isArray(item)) {
        item = [item];
      }
      return flat.concat(item);
    }, []);
  }
}

translators.Program = function (divProgram, context) {
  const name = divProgram.name.name;
  context.enterProcess(name);
  const privates = translatePrivates(name, context);
  const body = translate(divProgram.body, context);
  const translation = t.programFunction(
    name,
    (privates ? [privates] : []).concat(body)
  );
  context.exitProcess();
  return translation;
};

translators.Process = function (divProgram, context) {
  const name = divProgram.name.name;
  context.enterProcess(name);
  const privates = translatePrivates(name, context);
  const body = translate(divProgram.body, context);
  const translation = t.processFunction(
    name,
    (privates ? [privates] : []).concat(body)
  );
  context.exitProcess();
  return translation;
};

function translatePrivates(processName, context) {
  const mmap = context.getMemoryMap();
  const privates = mmap.segments.privates[processName];
  if (!privates) {
    return null;
  }
  const vars = getSegmentDeclarations("privates", [], privates);
  return new ast.VariableDeclaration(vars);
}

translators.ProcessBody = function (divBody, context) {
  context.startLinearization();
  divBody.sentences.map(function (sentence) {
    translate(sentence, context);
  });
  context.end();
  const bodyCases = context.getLinearizationCases();
  return t.concurrentBody(bodyCases);
};

translators.Identifier = function (divIdentifier, context) {
  const name = divIdentifier.name;
  const scope = context.getScope(name);
  if (!scope) {
    throw new Error("Unknown name " + name);
  }
  // In DIV, consts are substitutions, not variables.
  if (scope === "constant") {
    const value = context.constantValue(name);
    return ast.Literal.for(value);
  }
  const scopeTranslator = "memory" + scope[0].toUpperCase() + scope.substr(1);
  if (!(scopeTranslator in t)) {
    throw new Error("Unknown scope " + scope);
  }
  return t[scopeTranslator](name);
};

translators.IfSentence = function (divIf, context) {
  const consequentLabel = context.newLabel();
  const alternateLabel = context.newLabel();

  const test = t.toBool(translate(divIf.test, context));
  context.goToIf(test, consequentLabel, alternateLabel);
  context.label(consequentLabel);
  translateBody(divIf, context, "consequent");
  context.label(alternateLabel);
  if (divIf.alternate) {
    translateBody(divIf, context, "alternate");
  }
};

translators.ExpressionSentence = function (divExpression, context) {
  const expression = translate(divExpression.expression, context);
  context.verbatim(new ast.ExpressionStatement(expression));
};

translators.Literal = function (divLiteral) {
  return ast.Literal.for(divLiteral.value);
};

translators.WhileSentence = function (divWhile, context) {
  const loopStartLabel = context.newLabel();
  const afterLoopLabel = context.newLabel();
  const testLabel = context.newLabel();

  context.label(testLabel);
  context.goToIf(
    translate(divWhile.test, context),
    loopStartLabel,
    afterLoopLabel
  );

  context.label(loopStartLabel);
  translateBody(divWhile, context);
  context.goTo(testLabel);

  context.label(afterLoopLabel);
};

translators.LoopSentence = function (divLoop, context) {
  const loopStartLabel = context.newLabel();
  const afterLoopLabel = context.newLabel();

  context.label(loopStartLabel);
  translateBody(divLoop, context);
  context.goTo(loopStartLabel);

  context.label(afterLoopLabel);
};

translators.RepeatSentence = function (divRepeat, context) {
  const loopStartLabel = context.newLabel();
  const afterLoopLabel = context.newLabel();

  context.label(loopStartLabel);
  translateBody(divRepeat, context);
  context.goToIf(
    translate(divRepeat.test, context),
    afterLoopLabel,
    loopStartLabel
  );

  context.label(afterLoopLabel);
};

translators.ReturnSentence = function (divReturn, context) {
  let returnArgument = divReturn.argument;
  if (!returnArgument) {
    returnArgument = t.defaultReturnArgument;
  }
  context.return(translate(returnArgument, context));
};

translators.SwitchSentence = function (divSwitch, context) {
  const afterSwitchLabel = context.newLabel();
  const defaultCaseLabel = context.newLabel();

  const cases = divSwitch.cases;
  const lastCase = cases[cases.length - 1];
  const hasDefault = lastCase && lastCase.tests === null;
  if (hasDefault) {
    cases.pop();
  }

  const discriminant = translate(divSwitch.discriminant, context);
  const aux = context.newAux("_switch", discriminant);
  const choices = generateChoices(cases, context);

  context.verbatim(aux.declaration);
  context.select(
    aux.identifier,
    choices,
    hasDefault ? defaultCaseLabel : afterSwitchLabel
  );
  choices.forEach(function (choice) {
    context.label(choice.label);
    translateBody(choice.case, context, "consequent");
    context.goTo(afterSwitchLabel);
  });
  if (hasDefault) {
    const defaultCase = lastCase;
    context.label(defaultCaseLabel);
    translateBody(defaultCase, context, "consequent");
    context.goTo(afterSwitchLabel);
  }
  context.label(afterSwitchLabel);
};

function generateChoices(cases, context) {
  return cases.map(function (caseClause) {
    return {
      label: context.newLabel(),
      tests: caseClause.tests.map(function (test) {
        return translate(test, context);
      }),
      case: caseClause,
    };
  });
}

translators.FrameSentence = function (divFrame, context) {
  const resumeLabel = context.newLabel();
  const argument = divFrame.argument || t.defaultFrameArgument;
  context.frame(resumeLabel, translate(argument, context));
  context.label(resumeLabel);
};

translators.DebugSentence = function (divDebug, context) {
  const resumeLabel = context.newLabel();
  context.debug(resumeLabel);
  context.label(resumeLabel);
};

translators.FromSentence = function (divFrom, context) {
  const initValue = divFrom.init.value;
  const limitValue = divFrom.limit.value;
  const isAscendant = initValue < limitValue;
  const defaultStep = isAscendant ? 1 : -1;
  const step = divFrom.step ? divFrom.step.value : defaultStep;
  const identifier = divFrom.identifier.name;

  const init = t.fromInitilizator(identifier, initValue);
  const test = t.fromTest(identifier, limitValue, isAscendant);
  const update = t.fromIncrement(identifier, step);

  translateForLikeLoop(divFrom, [init], [test], [update], context);
};

translators.ForSentence = function (divFor, context) {
  const inits = divFor.inits;
  const tests = divFor.tests;
  const updates = divFor.updates;
  translateForLikeLoop(divFor, inits, tests, updates, context);
};

translators.Range = function (divRange) {
  return t.newRange(divRange.min, divRange.max);
};

/**
 * All parameters here must be DIV2 AST.
 */
function translateForLikeLoop(loop, inits, tests, updates, context) {
  const test = t.every(
    tests.map(function (test) {
      return t.toBool(translate(test, context));
    })
  );

  const testLabel = context.newLabel();
  const loopStartLabel = context.newLabel();
  const afterLoopLabel = context.newLabel();
  const updatesLabel = context.newLabel();

  inits.forEach(verbatim);

  context.label(testLabel);
  if (test) {
    context.goToIf(test, loopStartLabel, afterLoopLabel);
  }

  context.label(loopStartLabel);
  translateBody(loop, context);

  context.label(updatesLabel);
  updates.forEach(verbatim);
  context.goTo(testLabel);

  context.label(afterLoopLabel);

  function verbatim(divExpression) {
    context.verbatim(
      new ast.ExpressionStatement(translate(divExpression, context))
    );
  }
}

function translate(divAst, context) {
  if (!divAst || !divAst.type) {
    throw new Error("Invalid DIV2 AST");
  }
  if (!(divAst.type in translators)) {
    throw new Error("Translation unavailable for " + divAst.type + " AST");
  }
  return translators[divAst.type](divAst, context);
}

function translateBody(divBodySentence, context, bodyProperty = "body") {
  return divBodySentence[bodyProperty].sentences.map(function (sentence) {
    return translate(sentence, context);
  });
}

export { translate };
