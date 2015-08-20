
define([], function () {
  'use strict';

  var templates = {
    get processParameters() {
      return clone([
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
      ]);
    },

    get processBodyWrapper() {
      return clone({
        type: "WhileStatement",
        test: {
          type: "Literal",
          value: true,
          raw: "true"
        },
        body: {
          type: "BlockStatement",
          body: []
        }
      });
    },

    get processBodySkeleton() {
      return clone({
        type: "SwitchStatement",
        discriminant: {
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
        },
        cases: []
      });
    },

    get blockStatement() {
      return clone({
        type: 'BlockStatement',
        body: []
      });
    }
  };

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  var translators = Object.create(null);

  translators.Unit = function (divUnit) {
    var program = {
      type: "Program",
      body: []
    };
    var programFunction = translate(divUnit.program);
    var processesFunctions = divUnit.processes.map(translate);
    program.body = [programFunction].concat(processesFunctions);
    return program;
  };

  translators.Program = function (divProgram) {
    var functionDeclaration = {
      type: 'FunctionDeclaration',
      id: getProgramId(divProgram.name),
      params: templates.processParameters,
      defaults: [],
      body: {
        type: 'BlockStatement',
        body: [getProcessBody(divProgram.body)]
      },
      generator: false,
      expression: false
    };
    return functionDeclaration;
  };

  translators.ProcessBody = function (divBody) {
    var labeledBody = templates.processBodySkeleton;
    labeledBody.cases = linearize(divBody);
    return labeledBody;
  };

  translators.Identifier = function (divIdentifier) {
    return clone(divIdentifier);
  };

  function getProgramId(divIdentifier) {
    return getPrefixedId('program_', divIdentifier);
  }

  function getProcessId(divIdentifier) {
    return getPrefixedId('process_', divIdentifier);
  }

  function getPrefixedId(prefix, divIdentifier) {
    var jsIdentifier = translate(divIdentifier);
    jsIdentifier.name = prefix + jsIdentifier.name;
    return jsIdentifier;
  }

  function getProcessBody(divProcessBody) {
    var processBody = templates.processBodyWrapper;
    processBody.body.body = [translate(divProcessBody)];
    return processBody;
  }

  function linearize(divBody, linearization) {
    linearization = linearization || {
      pc: 1,
      cases: {}
    };
    return [];
  }

  function translate(divAst) {
    if (!divAst || !divAst.type) { throw new Error('Invalid DIV2 AST'); }
    if (!(divAst.type in translators)) {
      throw new Error('Translation unavailable for ' + divAst.type + ' AST');
    }
    return translators[divAst.type](divAst);
  }

  return {
    translate: translate
  };
});
