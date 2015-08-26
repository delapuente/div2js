
define(['context', 'ast', 'templates'], function (ctx, ast, t) {
  'use strict';

  var translators = Object.create(null);

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

    // Add implicit return
    context.verbatim(t.processEndReturn);

    var bodyCases = context.getLinearizationCases();
    return t.concurrentBody(bodyCases);
  };

  translators.Identifier = function (divIdentifier) {
    return new ast.Identifier(divIdentifier.name);
  };

  translators.ExpressionSentence = function (divExpression, context) {
    var expression = translate(divExpression.expression);
    context.verbatim(new ast.ExpressionStatement(expression));
  };

  translators.Literal = function (divLiteral) {
    return new ast.Literal(divLiteral.value);
  };

  translators.WhileSentence = function (divWhile, context) {

    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();
    var testLabel = context.newLabel();

    context.label(testLabel);
    context.goToIf(translate(divWhile.test), loopStartLabel, afterLoopLabel)

    context.label(loopStartLabel);
    divWhile.body.sentences.map(function (loopSentence) {
      translate(loopSentence, context);
    });
    context.goTo(testLabel);

    context.label(afterLoopLabel);
  };

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function translate(divAst, context) {
    context = context || new ctx.Context();
    if (!divAst || !divAst.type) { throw new Error('Invalid DIV2 AST'); }
    if (!(divAst.type in translators)) {
      throw new Error('Translation unavailable for ' + divAst.type + ' AST');
    }
    return translators[divAst.type](divAst, context);
  }

  return {
    translate: translate
  };
});
