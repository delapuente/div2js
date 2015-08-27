
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

  translators.Identifier = function (divIdentifier) {
    return t.memory(divIdentifier.name);
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

  translators.FromSentence = function (divFrom, context) {
    var initValue = divFrom.init.value;
    var limitValue = divFrom.limit.value;
    var isAscendant = initValue < limitValue;
    var defaultStep = isAscendant ? 1 : -1;
    var step = divFrom.step ? divFrom.step.value : defaultStep;
    var identifier = divFrom.identifier.name;

    var init = t.fromInitilizator(identifier, initValue);
    var test = t.fromTest(identifier, limitValue, isAscendant);
    var increment = t.fromIncrement(identifier, step);

    var testLabel = context.newLabel();
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();

    context.verbatim(init);
    context.label(testLabel);
    context.goToIf(test, loopStartLabel, afterLoopLabel);

    context.label(loopStartLabel);
    translateBody(divFrom, context);
    context.verbatim(increment);
    context.goTo(testLabel);

    context.label(afterLoopLabel);
  };

  translators.ForSentence = function (divFor, context) {
    var inits = divFor.inits;
    var tests = divFor.tests;
    var updates = divFor.updates;
    translateForLikeLoop(divFor, inits, tests, updates, context);
  };

  function translateForLikeLoop(loop, inits, tests, updates, context) {
    var test = t.forLoopTest(tests.map(function (test) {
      return translate(test, context);
    }));

    var testLabel = context.newLabel();
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();
    var updatesLabel = context.newLabel();

    inits.forEach(verbatim);

    context.label(testLabel);
    context.goToIf(test, loopStartLabel, afterLoopLabel);

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

  function translate(divAst, context) {
    context = context || new ctx.Context();
    if (!divAst || !divAst.type) { throw new Error('Invalid DIV2 AST'); }
    if (!(divAst.type in translators)) {
      throw new Error('Translation unavailable for ' + divAst.type + ' AST');
    }
    return translators[divAst.type](divAst, context);
  }

  function translateBody(divBodySentence, context) {
    return divBodySentence.body.sentences.map(function (sentence) {
      return translate(sentence, context);
    });
  }

  return {
    translate: translate
  };
});
