import * as ast from './ast';
import t from './templates';

let translators = Object.create(null);

// TODO: Consider switching these to MemortBrowser-based assignment and read
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
    case '&':
    case '&&':
      logicalFunction = '__and';
      break;
    case '||':
      logicalFunction = '__or';
      break;
    case '^':
    case '^^':
      logicalFunction = '__xor';
      break;
    default:
      throw new Error('Logical operator unknown: ' + divLogical.operator);
  }
  return t.callWith(logicalFunction, [
    translate(divLogical.left, context),
    translate(divLogical.right, context)
  ]);
};

translators.CallExpression = function (divCall, context) {
  let parameters = new ast.ArrayExpression(
    divCall.arguments.map(function (arg) {
      return translate(arg, context);
    })
  );
  let id = divCall.callee.name;
  let isProcess = context.isProcess(id);
  let afterCallLabel = context.newLabel();
  let callKind = isProcess ? 'newProcess' : 'callFunction';
  // Isolate as a subexpression (impicitely stored in the results queue)
  context[callKind](afterCallLabel, id, parameters);
  context.label(afterCallLabel);
  // Replace by the intermediate value (i.e. dequeue from the results queue)
  return t.dequeueReturnValue;
};

translators.CloneSentence = function (divClone, context) {
  let insideCloneLabel = context.newLabel();
  let afterCloneLabel = context.newLabel();
  context.clone(insideCloneLabel, afterCloneLabel);
  context.label(insideCloneLabel);
  translateBody(divClone, context);
  context.label(afterCloneLabel);
};

translators.Unit = function (divUnit, context) {
  let programFunction = translate(divUnit.program, context);
  let processesFunctions = divUnit.processes.map(function (divProcess) {
    return translate(divProcess, context);
  });
  let globals = translateGlobals(context);
  let locals = translateLocals(context);
  let privateOffset = createPrivateOffset(context);
  return new ast.Program(
    [globals, locals, privateOffset]
    .concat([programFunction])
    .concat(processesFunctions)
  );
};

function translateGlobals (context) {
  let globalBase = getGlobalBaseDeclaration(context);
  let globalDeclarations = translateSegment('globals', context);
  globalDeclarations.declarations.unshift(globalBase);
  return globalDeclarations;
}

function translateLocals (context) {
  return translateSegment('locals', context);
}

function createPrivateOffset (context) {
  let mmap = context.getMemoryMap();
  return new ast.VariableDeclaration([
    new ast.VariableDeclarator(
      new ast.Identifier('P_OFFSET'),
      ast.Literal['for'](mmap.localSegmentSize)
    )
  ]);
}

function getGlobalBaseDeclaration (context) {
  let offset = context.getMemoryMap().constructor.GLOBAL_OFFSET;
  return new ast.VariableDeclarator(
    t.globalBaseIdentifier,
    ast.Literal['for'](offset)
  );
}

function translateSegment (segment, context) {
  let mmap = context.getMemoryMap();
  let vars = getSegmentDeclarations(segment, [], mmap.cells[segment]);
  return new ast.VariableDeclaration(vars);
}

function getSegmentDeclarations (segment, prefixes, cells) {
  let definitions = [];
  for (let i = 0, l = cells.length; i < l; i++) {
    let cell = cells[i];
    if (!cell.hidden) {
      let identifierFactory = 'identifierFor' + ({
        'globals': 'Global',
        'locals': 'Local',
        'privates': 'Private'
      }[segment]);
      prefixes.push(cell.name);
      definitions.push(new ast.VariableDeclarator(
        t[identifierFactory](prefixes),
        ast.Literal['for'](cell.offset)
      ));
      if (cell.type === 'struct') {
        definitions = definitions.concat(
          getSegmentDeclarations(segment, prefixes, cell.fields)
        );
      }
      prefixes.pop();
    }
  }
  return flat(definitions);

  function flat (list) {
    return list.reduce(function (flat, item) {
      if (!Array.isArray(item)) {
        item = [item];
      }
      return flat.concat(item);
    }, []);
  }
}

translators.Program = function (divProgram, context) {
  let name = divProgram.name.name;
  context.enterProcess(name);
  let privates = translatePrivates(name, context);
  let body = translate(divProgram.body, context);
  let translation = t.programFunction(name, (privates ? [privates] : []).concat(body));
  context.exitProcess();
  return translation;
};

translators.Process = function (divProgram, context) {
  let name = divProgram.name.name;
  context.enterProcess(name);
  let privates = translatePrivates(name, context);
  let body = translate(divProgram.body, context);
  let translation = t.processFunction(name, (privates ? [privates] : []).concat(body));
  context.exitProcess();
  return translation;
};

function translatePrivates (processName, context) {
  let mmap = context.getMemoryMap();
  let privates = mmap.cells.privates[processName];
  if (!privates) {
    return null;
  }
  let vars = getSegmentDeclarations('privates', [], privates);
  return new ast.VariableDeclaration(vars);
}

translators.ProcessBody = function (divBody, context) {
  context.startLinearization();
  divBody.sentences.map(function (sentence) {
    translate(sentence, context);
  });
  context.end();
  let bodyCases = context.getLinearizationCases();
  return t.concurrentBody(bodyCases);
};

translators.Identifier = function (divIdentifier, context) {
  let name = divIdentifier.name;
  let scope = context.getScope(name);
  if (!scope) { throw new Error('Unknown name ' + name); }
  let scopeTranslator = 'memory' + scope[0].toUpperCase() + scope.substr(1);
  if (!(scopeTranslator in t)) { throw new Error('Unknown scope ' + scope); }
  return t[scopeTranslator](name);
};

translators.IfSentence = function (divIf, context) {
  let consequentLabel = context.newLabel();
  let alternateLabel = context.newLabel();

  let test = t.toBool(translate(divIf.test, context));
  context.goToIf(test, consequentLabel, alternateLabel);
  context.label(consequentLabel);
  translateBody(divIf, context, 'consequent');
  context.label(alternateLabel);
  if (divIf.alternate) {
    translateBody(divIf, context, 'alternate');
  }
};

translators.ExpressionSentence = function (divExpression, context) {
  let expression = translate(divExpression.expression, context);
  context.verbatim(new ast.ExpressionStatement(expression));
};

translators.Literal = function (divLiteral) {
  return ast.Literal.for(divLiteral.value);
};

translators.WhileSentence = function (divWhile, context) {
  let loopStartLabel = context.newLabel();
  let afterLoopLabel = context.newLabel();
  let testLabel = context.newLabel();

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
  let loopStartLabel = context.newLabel();
  let afterLoopLabel = context.newLabel();

  context.label(loopStartLabel);
  translateBody(divLoop, context);
  context.goTo(loopStartLabel);

  context.label(afterLoopLabel);
};

translators.RepeatSentence = function (divRepeat, context) {
  let loopStartLabel = context.newLabel();
  let afterLoopLabel = context.newLabel();

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
  let afterSwitchLabel = context.newLabel();
  let defaultCaseLabel = context.newLabel();

  let cases = divSwitch.cases;
  let lastCase = cases[cases.length - 1];
  let hasDefault = lastCase && lastCase.tests === null;
  if (hasDefault) { cases.pop(); }

  let discriminant = translate(divSwitch.discriminant, context);
  let aux = context.newAux('_switch', discriminant);
  let choices = generateChoices(cases, context);

  context.verbatim(aux.declaration);
  context.select(
    aux.identifier, choices,
    hasDefault ? defaultCaseLabel : afterSwitchLabel
  );
  choices.forEach(function (choice) {
    context.label(choice.label);
    translateBody(choice.case, context, 'consequent');
    context.goTo(afterSwitchLabel);
  });
  if (hasDefault) {
    let defaultCase = lastCase;
    context.label(defaultCaseLabel);
    translateBody(defaultCase, context, 'consequent');
    context.goTo(afterSwitchLabel);
  }
  context.label(afterSwitchLabel);
};

function generateChoices (cases, context) {
  return cases.map(function (caseClause) {
    return {
      label: context.newLabel(),
      tests: caseClause.tests.map(function (test) {
        return translate(test, context);
      }),
      case: caseClause
    };
  });
}

translators.FrameSentence = function (divFrame, context) {
  let resumeLabel = context.newLabel();
  let argument = divFrame.argument || t.defaultFrameArgument;
  context.frame(resumeLabel, translate(argument, context));
  context.label(resumeLabel);
};

translators.DebugSentence = function (divDebug, context) {
  let resumeLabel = context.newLabel();
  context.debug(resumeLabel);
  context.label(resumeLabel);
};

translators.FromSentence = function (divFrom, context) {
  let initValue = divFrom.init.value;
  let limitValue = divFrom.limit.value;
  let isAscendant = initValue < limitValue;
  let defaultStep = isAscendant ? 1 : -1;
  let step = divFrom.step ? divFrom.step.value : defaultStep;
  let identifier = divFrom.identifier.name;

  let init = t.fromInitilizator(identifier, initValue);
  let test = t.fromTest(identifier, limitValue, isAscendant);
  let update = t.fromIncrement(identifier, step);

  translateForLikeLoop(divFrom, [init], [test], [update], context);
};

translators.ForSentence = function (divFor, context) {
  let inits = divFor.inits;
  let tests = divFor.tests;
  let updates = divFor.updates;
  translateForLikeLoop(divFor, inits, tests, updates, context);
};

translators.Range = function (divRange) {
  return t.newRange(divRange.min, divRange.max);
};

/**
 * All parameters here must be DIV2 AST.
 */
function translateForLikeLoop (loop, inits, tests, updates, context) {
  let test = t.every(tests.map(function (test) {
    return t.toBool(translate(test, context));
  }));

  let testLabel = context.newLabel();
  let loopStartLabel = context.newLabel();
  let afterLoopLabel = context.newLabel();
  let updatesLabel = context.newLabel();

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

  function verbatim (divExpression) {
    context.verbatim(new ast.ExpressionStatement(
      translate(divExpression, context)
    ));
  }
}

function translate (divAst, context) {
  if (!divAst || !divAst.type) { throw new Error('Invalid DIV2 AST'); }
  if (!(divAst.type in translators)) {
    throw new Error('Translation unavailable for ' + divAst.type + ' AST');
  }
  return translators[divAst.type](divAst, context);
}

function translateBody (divBodySentence, context, bodyProperty= 'body') {
  return divBodySentence[bodyProperty].sentences.map(function (sentence) {
    return translate(sentence, context);
  });
}

export {
  translate
};