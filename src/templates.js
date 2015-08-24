
define(['ast'], function (ast) {
  'use strict';

  return {

    concurrentBody: function (cases) {
      var programCounter = this.programCounter;
      var switchStatement = new ast.SwitchStatement(programCounter, cases);
      return this.infiniteLoop(switchStatement);
    },

    concurrentLabel: function (label) {
      return new ast.SwitchCase(new ast.Literal(label));
    },

    get endToken() {
      return {
        type: "Identifier",
        name: "__PROCESS_END"
      };
    },

    infiniteLoop: function (body) {
      return new ast.WhileStatement(this.trueLiteral, body);
    },

    labeledBlock: function (label) {
      return new ast.SwitchCase(new ast.Literal(label));
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

    get processParameters() {
      return [
        {
          type: "Identifier",
          name: "mem"
        },
        {
          type: "Identifier",
          name: "exec"
        },
        {
          type: "Identifier",
          name: "args"
        }
      ];
    },

    get programCounter() {
      return {
        type: "MemberExpression",
        computed: false,
        object: {
          type: "Identifier",
          name: "exec"
        },
        property: {
          type: "Identifier",
          name: "pc"
        }
      };
    },

    get trueLiteral() {
      return {
        type: "Literal",
        value: true,
        raw: "true"
      };
    }

  };
});
