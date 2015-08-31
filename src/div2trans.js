
define(['context', 'ast', 'templates'], function (ctx, ast, t) {
  'use strict';

  var translators = Object.create(null);

  translators.AssignmentExpression = function (divAssignment, context) {
    return new ast.AssignmentExpression(
      translate(divAssignment.left),
      translate(divAssignment.right),

      // XXX: This is good luck. All assignment operators are equal!
      divAssignment.operator
    );
  };

  translators.BinaryExpression = function (divBinary, context) {
    return new ast.BinaryExpression(
      translate(divBinary.left),
      translate(divBinary.right),
      divBinary.operator
    );
  };

  translators.Unit = function (divUnit, context) {
    var programFunction = translate(divUnit.program, context);
    var processesFunctions = divUnit.processes.map(function (divProcess) {
      return translate(divProcess, context);
    });
    return new ast.Program([programFunction].concat(processesFunctions));
  };

  translators.Program = function (divProgram, context) {
    var name = divProgram.name.name;
    var body = translate(divProgram.body, context);
    return t.processFunction(name, body);
  };

  translators.ProcessBody = function (divBody, context) {
    context.startLinearization();
    divBody.sentences.map(function (sentence) {
      translate(sentence, context);
    });
    context.end();
    var bodyCases = context.getLinearizationCases();
    return t.concurrentBody(bodyCases);
  };

  translators.Identifier = function (divIdentifier, context) {
    return t.memory(divIdentifier.name);
  };

  translators.IfSentence = function (divIf, context) {
    var consequentLabel = context.newLabel();
    var alternateLabel = context.newLabel();

    var test = t.toBool(translate(divIf.test));
    context.goToIf(test, consequentLabel, alternateLabel);
    context.label(consequentLabel);
    translateBody(divIf, context, 'consequent');
    context.label(alternateLabel);
    if (divIf.alternate) {
      translateBody(divIf, context, 'alternate');
    }
  };

  translators.ExpressionSentence = function (divExpression, context) {
    var expression = translate(divExpression.expression);
    context.verbatim(new ast.ExpressionStatement(expression));
  };

  translators.Literal = function (divLiteral) {
    return ast.Literal.for(divLiteral.value);
  };

  translators.WhileSentence = function (divWhile, context) {
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();
    var testLabel = context.newLabel();

    context.label(testLabel);
    context.goToIf(translate(divWhile.test), loopStartLabel, afterLoopLabel)

    context.label(loopStartLabel);
    translateBody(divWhile, context);
    context.goTo(testLabel);

    context.label(afterLoopLabel);
  };

  translators.LoopSentence = function (divLoop, context) {
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();

    context.label(loopStartLabel);
    translateBody(divLoop, context);
    context.goTo(loopStartLabel);

    context.label(afterLoopLabel);
  };

  translators.RepeatSentence = function (divRepeat, context) {
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();

    context.label(loopStartLabel);
    translateBody(divRepeat, context);
    context.goToIf(translate(divRepeat.test), afterLoopLabel, loopStartLabel);

    context.label(afterLoopLabel);
  };

  translators.SwitchSentence = function (divSwitch, context) {
    var afterSwitchLabel = context.newLabel();
    var defaultCaseLabel = context.newLabel();

    var cases = divSwitch.cases;
    var lastCase = cases[cases.length - 1];
    var hasDefault = lastCase && lastCase.tests === null;
    if (hasDefault) { cases.pop(); }

    var discriminant = translate(divSwitch.discriminant, context);
    var discriminantAuxDeclaration = context.newAux('_switch', discriminant);
    var discriminantAux = discriminantAuxDeclaration.declarations[0].id;
    var options = generateTestsAndLabelsForCases(cases, context);

    context.verbatim(discriminantAuxDeclaration);
    context.select(
      discriminantAux,
      options,
      hasDefault ? defaultCaseLabel : afterSwitchLabel
    );
    options.forEach(function (option) {
      context.label(option.label);
      translateBody(option.caseClause, context, 'consequent');
      context.goTo(afterSwitchLabel);
    });
    if (hasDefault) {
      var defaultCase = lastCase;
      context.label(defaultCaseLabel);
      translateBody(defaultCase, context, 'consequent');
      context.goTo(afterSwitchLabel);
    }
    context.label(afterSwitchLabel);
  };

  function generateTestsAndLabelsForCases(cases, context) {
    return cases.map(function (caseClause) {
      return {
        label: context.newLabel(),
        tests: caseClause.tests.map(function (test) {
          return translate(test, context);
        }),
        caseClause: caseClause
      };
    });
  }

  translators.FromSentence = function (divFrom, context) {
    var initValue = divFrom.init.value;
    var limitValue = divFrom.limit.value;
    var isAscendant = initValue < limitValue;
    var defaultStep = isAscendant ? 1 : -1;
    var step = divFrom.step ? divFrom.step.value : defaultStep;
    var identifier = divFrom.identifier.name;

    var init = t.fromInitilizator(identifier, initValue);
    var test = t.fromTest(identifier, limitValue, isAscendant);
    var update = t.fromIncrement(identifier, step);

    translateForLikeLoop(divFrom, [init], [test], [update], context);
  };

  translators.ForSentence = function (divFor, context) {
    var inits = divFor.inits;
    var tests = divFor.tests;
    var updates = divFor.updates;
    translateForLikeLoop(divFor, inits, tests, updates, context);
  };

  translators.Range = function (divRange, context) {
    return t.newRange(divRange.min, divRange.max);
  };

  /**
   * All parameters here must be DIV2 AST.
   */
  function translateForLikeLoop(loop, inits, tests, updates, context) {
    var test = t.every(tests.map(function (test) {
      return t.toBool(translate(test, context));
    }));

    var testLabel = context.newLabel();
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();
    var updatesLabel = context.newLabel();

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
      context.verbatim(new ast.ExpressionStatement(translate(divExpression)));
    }
  }

  function buildForLikeLoop(loop, inits, tests, updates, context) {
    var verbatim = context.verbatim.bind(context);
    var testLabel = context.newLabel();
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();
    var updatesLabel = context.newLabel();

  }

  function translate(divAst, context) {
    context = context || new ctx.Context();
    if (!divAst || !divAst.type) { throw new Error('Invalid DIV2 AST'); }
    if (!(divAst.type in translators)) {
      throw new Error('Translation unavailable for ' + divAst.type + ' AST');
    }
    return translators[divAst.type](divAst, context);
  }

  function translateBody(divBodySentence, context, bodyProperty) {
    bodyProperty = bodyProperty || 'body';
    return divBodySentence[bodyProperty].sentences.map(function (sentence) {
      return translate(sentence, context);
    });
  }

  return {
    translate: translate
  };
});
