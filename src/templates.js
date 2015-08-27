
define(['ast'], function (ast) {
  'use strict';

  return {

    callWith: function (name) {
      return new ast.CallExpression(
        new ast.Identifier(name),
        Array.prototype.slice.call(arguments, 1)
      );
    },

    concurrentBody: function (cases) {
      var programCounter = this.programCounter;
      var switchStatement = new ast.SwitchStatement(programCounter, cases);
      return this.infiniteLoop(switchStatement);
    },

    concurrentLabel: function (label) {
      return new ast.SwitchCase(ast.Literal.for(label));
    },

    get endToken() {
      return {
        type: 'Identifier',
        name: '__PROCESS_END'
      };
    },

    forLoopTest: function (tests) {
      var _this = this;
      return tests.reduce(function (chain, test) {
        var wrapped = _this.callWith('__isTrue', test);
        return chain === null ?
               wrapped :
               new ast.BinaryExpression(chain, wrapped, '&&');
      }, null);
    },

    fromIncrement: function (name, constant) {
      return new ast.ExpressionStatement(
        new ast.AssignmentExpression(
          this.memory(name),
          ast.Literal.for(constant),
          '+='
        )
      );
    },

    fromInitilizator: function (name, constant) {
      return new ast.ExpressionStatement(
        new ast.AssignmentExpression(
          this.memory(name),
          ast.Literal.for(constant)
        )
      );
    },

    fromTest: function (name, constant, isLowerThan) {
      return new ast.BinaryExpression(
        this.memory(name),
        ast.Literal.for(constant),
        isLowerThan ? '<=' : '>='
      );
    },

    infiniteLoop: function (body) {
      return new ast.WhileStatement(this.trueLiteral, body);
    },

    labeledBlock: function (label) {
      return new ast.SwitchCase(ast.Literal.for(label));
    },

    memory: function (name) {
      return new ast.MemberExpression(
        new ast.Identifier('mem'),
        new ast.Identifier(name),
        true
      );
    },

    get processEndReturn() {
      return new ast.ReturnStatement(this.endToken);
    },

    processFunction: function (name, body) {
      return new ast.FunctionDeclaration(
        new ast.Identifier('program_' + name),
        this.processParameters, null,
        body
      );
    },

    // TODO: Maybe mem, exec & args should be supplied by div2trans
    get processParameters() {
      return [
        new ast.Identifier('mem'),
        new ast.Identifier('exec'),
        new ast.Identifier('args')
      ];
    },

    get programCounter() {
      return new ast.MemberExpression(
        new ast.Identifier('exec'),
        new ast.Identifier('pc')
      );
    },

    get trueLiteral() {
      return ast.Literal.for(true);
    }

  };
});
