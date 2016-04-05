
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
    var wrappedAst = wrap(mapAst);
    var objText = generator.generate(wrappedAst);
    return objText;
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

  function wrap(mapAst) {
    var wrapper = JSON.parse(JSON.stringify(wrapperTemplate));
    var body = wrapper.body[0].expression.body.body;
    var ret = body[body.length - 1];
    ret.argument = mapAst.expression;
    return wrapper;
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

  // XXX: This is the AST for runtime/wrapper.js
  // XXX: They should be kept in sync somehow. Now it is manual.
  // XXX: Consider loading and parsing the template from an external source or
  // embedding in a building step.
  var wrapperTemplate = {
    'type': 'Program',
    'body': [
      {
        'type': 'ExpressionStatement',
        'expression': {
          'type': 'FunctionExpression',
          'id': null,
          'params': [
            {
              'type': 'Identifier',
              'name': 'rt'
            }
          ],
          'defaults': [],
          'body': {
            'type': 'BlockStatement',
            'body': [
              {
                'type': 'ExpressionStatement',
                'expression': {
                  'type': 'Literal',
                  'value': 'use strict',
                  'raw': '\'use strict\''
                }
              },
              {
                'type': 'FunctionDeclaration',
                'id': {
                  'type': 'Identifier',
                  'name': '__yieldDebug'
                },
                'params': [
                  {
                    'type': 'Identifier',
                    'name': 'npc'
                  }
                ],
                'defaults': [],
                'body': {
                  'type': 'BlockStatement',
                  'body': [
                    {
                      'type': 'ReturnStatement',
                      'argument': {
                        'type': 'NewExpression',
                        'callee': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'Identifier',
                            'name': 'rt'
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'Baton'
                          }
                        },
                        'arguments': [
                          {
                            'type': 'Literal',
                            'value': 'debug',
                            'raw': '\'debug\''
                          },
                          {
                            'type': 'ObjectExpression',
                            'properties': [
                              {
                                'type': 'Property',
                                'key': {
                                  'type': 'Identifier',
                                  'name': 'npc'
                                },
                                'computed': false,
                                'value': {
                                  'type': 'Identifier',
                                  'name': 'npc'
                                },
                                'kind': 'init',
                                'method': false,
                                'shorthand': false
                              }
                            ]
                          }
                        ]
                      }
                    }
                  ]
                },
                'generator': false,
                'expression': false
              },
              {
                'type': 'VariableDeclaration',
                'declarations': [
                  {
                    'type': 'VariableDeclarator',
                    'id': {
                      'type': 'Identifier',
                      'name': '__yieldEnd'
                    },
                    'init': {
                      'type': 'NewExpression',
                      'callee': {
                        'type': 'MemberExpression',
                        'computed': false,
                        'object': {
                          'type': 'Identifier',
                          'name': 'rt'
                        },
                        'property': {
                          'type': 'Identifier',
                          'name': 'Baton'
                        }
                      },
                      'arguments': [
                        {
                          'type': 'Literal',
                          'value': 'end',
                          'raw': '\'end\''
                        }
                      ]
                    }
                  }
                ],
                'kind': 'var'
              },
              {
                'type': 'ReturnStatement',
                'argument': null
              }
            ]
          },
          'generator': false,
          'expression': false
        }
      }
    ],
    'sourceType': 'script'
  };

  return {
    compile: compile
  };
});
