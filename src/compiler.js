
define([
  'div2lang',
  'div2checker',
  'div2trans',
  'lib/escodegen'
], function (parser, checker, translator, generator) {
  'use strict';

  parser.yy = parser.yy || {};
  parser.yy.parseError = parser.parseError;

  function compile(srcText) {
    var div2Ast = parser.parse(srcText);
    var context = checker.extractContext(div2Ast);
    var jsAst = translator.translate(div2Ast, context);
    var memoryOffsetsAst = extractMemoryBindings(jsAst);
    var memoryMapAst = generateMemoryMap(memoryOffsetsAst);
    var processMapAst = generateProcessMap(jsAst);
    var wrappedAst = wrap(processMapAst, memoryOffsetsAst, memoryMapAst);
    var objText = generator.generate(wrappedAst);
    return objText;
  }

  function extractMemoryBindings(ast) {
    return ast.body.filter(function (statement) {
      return statement.type === 'VariableDeclaration';
    });
  }

  function generateMemoryMap(bindingsAst) {
    var mapAst = {
      type: 'ExpressionStatement',
      expression: {
        type: 'ObjectExpression',
        properties: [
          {
            type: 'Property',
            key: {
              type: 'Identifier',
              name: 'G'
            },
            computed: false,
            value: {
              type: 'ObjectExpression',
              properties: []
            },
            kind: 'init',
            method: false,
            shorthand: false
          },
          {
            type: 'Property',
            key: {
              type: 'Identifier',
              name: 'L'
            },
            computed: false,
            value: {
              type: 'ObjectExpression',
              properties: []
            },
            kind: 'init',
            method: false,
            shorthand: false
          },
          {
            type: 'Property',
            key: {
              type: 'Identifier',
              name: 'P'
            },
            computed: false,
            value: {
              type: 'ObjectExpression',
              properties: []
            },
            kind: 'init',
            method: false,
            shorthand: false
          },
        ]
      }
    };
    var globalBindingsAst = bindingsAst[0];
    mapAst.expression.properties[0].value.properties =
    globalBindingsAst.declarations
    .map(function (offsetAst) {
      return propertyEntry(offsetAst.id.name, offsetAst.init);
    });
    return mapAst;
  }

  function generateProcessMap(ast) {
    var mapAst = {
      type: 'ExpressionStatement',
      expression: {
        type: 'ObjectExpression',
        properties: []
      }
    };
    mapAst.expression.properties = ast.body
    .filter(function (statement) {
      return statement.type === 'FunctionDeclaration';
    })
    .map(newEntry);
    return mapAst;
  }

  function wrap(processMapAst, memoryOffsetsAst, memoryMapAst) {
    var wrapper = JSON.parse(JSON.stringify(wrapperTemplate));
    var body = wrapper.body[0].expression.body.body;
    body.splice.apply(body, [1, 0].concat(memoryOffsetsAst));
    var ret = body[body.length - 1];
    ret.argument.properties.push(entryForPMap(processMapAst.expression));
    if (memoryMapAst) {
      ret.argument.properties.push(entryForMMap(memoryMapAst.expression));
    }
    return wrapper;
  }

  function entryForPMap(expression) {
    return propertyEntry('pmap', expression);
  }

  function entryForMMap(expression) {
    return propertyEntry('mmap', expression);
  }

  function newEntry(functionDeclaration) {
    var functionExpression = Object.create(functionDeclaration);
    functionExpression.type = 'FunctionExpression';
    return propertyEntry(getName(functionExpression), functionExpression);
  }

  function propertyEntry(name, value) {
    return {
      type: 'Property',
      key: {
        type: 'Identifier',
        name: name
      },
      computed: false,
      value: value,
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
                'argument': {
                  'type': 'ObjectExpression',
                  'properties': []
                }
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
