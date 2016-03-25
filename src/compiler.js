
define([
  'div2lang',
  'div2trans',
  'lib/escodegen'
], function (parser, translator, generator) {
  'use strict';

  function compile(srcText) {
    var div2Ast = parser.parse(srcText);
    var jsAst = translator.translate(div2Ast);
    var mapAst = generateProcessMap(jsAst);
    var objText = generator.generate(mapAst);
    return Promise.resolve(objText);
  }

  function generateProcessMap(ast) {
    var mapAst = {
      type: 'ExpressionStatement',
      expression: {
        type: 'ObjectExpression',
        properties: []
      }
    };
    mapAst.expression.properties = ast.body.map(function (statement) {
      if (statement.type === 'FunctionDeclaration') {
        return newEntry(statement);
      }
    });
    return mapAst;
  }

  function newEntry(functionDeclaration) {
    var functionExpression = Object.create(functionDeclaration);
    functionExpression.type = 'FunctionExpression';
    return {
      type: 'Property',
      key: {
        type: 'Identifier',
        name: getName(functionExpression)
      },
      computed: false,
      value: functionExpression,
      kind: 'init',
      method: false,
      shorthand: false
    };
  }

  function getName(functionExpression) {
    var functionId = functionExpression.id.name;
    if (startsWith(functionId, 'program_')) {
      return 'program';
    }
    return functionId;
  }

  function startsWith(str, prefix) {
    return str.substr(0, prefix.length) === prefix;
  }

  return {
    compile: compile
  };
});
