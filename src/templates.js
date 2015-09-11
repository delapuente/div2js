
define(['ast'], function (ast) {
  'use strict';

  return {

    callWith: function (name, args) {
      if (!Array.isArray(args)) {
        args = args ? [args] : [];
      }
      return new ast.CallExpression(new ast.Identifier(name), args);
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
        name: '__yieldEnd'
      };
    },

    every: function (tests) {
      var _this = this;
      return tests.reduce(function (chain, test) {
        return chain === null ? test :
               new ast.LogicalExpression(chain, test, '&&');
      }, null);
    },

    /**
     * Builds a DIV2 AST for a FROM update.
     *
     * @return a DIV2 increment expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    fromIncrement: function (name, constant) {
      return {
        type: 'AssignmentExpression',
        operator: '+=',
        left: {
          type: 'Identifier',
          name: name
        },
        right: {
          type: 'Literal',
          value: constant,
          raw: JSON.stringify(constant)
        }
      };
    },

    /**
     * Builds a DIV2 AST for a FROM initializator.
     *
     * @return a DIV2 assignment expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    fromInitilizator: function (name, constant) {
      return {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'Identifier',
          name: name
        },
        right: {
          type: 'Literal',
          value: constant,
          raw: JSON.stringify(constant)
        }
      };
    },

    /**
     * Builds a DIV2 AST for FROM test.
     *
     * @return a DIV2 comparison expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    fromTest: function (name, constant, isLowerThan) {
      return {
        type: 'BinaryExpression',
        operator: isLowerThan ? '<=' : '>=',
        left: {
          type: 'Identifier',
          name: name
        },
        right: {
          type: 'Literal',
          value: constant,
          raw: JSON.stringify(constant)
        }
      };
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

    newRange: function (min, max) {
      return this.callWith('__range', [min, max]);
    },

    get processEnd() {
      return new ast.ReturnStatement(this.endToken);
    },

    processClone: function (child, parent) {
      return new ast.ReturnStatement(
        this.callWith(
          '__yieldClone',
          [ast.Literal.for(child), ast.Literal.for(parent)]
        )
      );
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

    some: function (evaluation, tests) {
      return this.callWith('__some', [evaluation].concat(tests));
    },

    toBool: function (ast) {
      return this.callWith('__bool', ast);
    },

    get trueLiteral() {
      return ast.Literal.for(true);
    }

  };
});
