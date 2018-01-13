import * as parser from './div2lang';
import * as checker from './div2checker';
import * as translator from './div2trans';
import * as ast from './ast';
import * as symbols from './memory/symbols';
import definitions from './memory/definitions';
import * as mapper from './memory/mapper';
import * as generator from 'escodegen';

var SymbolTable = symbols.SymbolTable;

parser.yy = parser.yy || {};
parser.yy.parseError = parser.parseError;

function compile(srcText, sourceURL) {
  sourceURL = sourceURL || '/div-program.js';
  var symbolTable = new SymbolTable(definitions);
  var div2Ast = parser.parse(srcText);
  var context = checker.extractContext(div2Ast, symbolTable);
  var jsAst = translator.translate(div2Ast, context);
  //TODO: When implementing non debug mode, the memory map can be omitted
  // although segment sizes and other relevant runtime variables are still
  // needed.
  var mmap = context.getMemoryMap();
  var memoryMapAst = generateMemoryMap(mmap);
  var processMapAst = generateProcessMap(jsAst);
  var memoryOffsetsAst = extractMemoryBindings(jsAst);
  var wrappedAst = wrap(processMapAst, memoryOffsetsAst, memoryMapAst);
  var objText = generator.generate(wrappedAst);
  return objText + '\n//@ sourceURL=' + sourceURL;
}

function extractMemoryBindings(ast) {
  return ast.body.filter(function (statement) {
    return statement.type === 'VariableDeclaration';
  });
}

function generateMemoryMap(mmap) {
  var jsonMmap = mapper.exportToJson(mmap);
  return new ast.ExpressionStatement(ast.fromJson(jsonMmap));
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
// XXX: It is kept in sync with the command grunt embed-wrapper
var wrapperTemplate = {"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"FunctionExpression","id":null,"params":[{"type":"Identifier","name":"rt"}],"body":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"Literal","value":"use strict","raw":"'use strict'"},"directive":"use strict"},{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"__yieldFrame"},"params":[{"type":"Identifier","name":"npc"},{"type":"Identifier","name":"completion"}],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"NewExpression","callee":{"type":"MemberExpression","computed":false,"object":{"type":"Identifier","name":"rt"},"property":{"type":"Identifier","name":"Baton"}},"arguments":[{"type":"Literal","value":"frame","raw":"'frame'"},{"type":"ObjectExpression","properties":[{"type":"Property","key":{"type":"Identifier","name":"npc"},"computed":false,"value":{"type":"Identifier","name":"npc"},"kind":"init","method":false,"shorthand":false},{"type":"Property","key":{"type":"Identifier","name":"completion"},"computed":false,"value":{"type":"Identifier","name":"completion"},"kind":"init","method":false,"shorthand":false}]}]}}]},"generator":false,"expression":false},{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"__yieldDebug"},"params":[{"type":"Identifier","name":"npc"}],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"NewExpression","callee":{"type":"MemberExpression","computed":false,"object":{"type":"Identifier","name":"rt"},"property":{"type":"Identifier","name":"Baton"}},"arguments":[{"type":"Literal","value":"debug","raw":"'debug'"},{"type":"ObjectExpression","properties":[{"type":"Property","key":{"type":"Identifier","name":"npc"},"computed":false,"value":{"type":"Identifier","name":"npc"},"kind":"init","method":false,"shorthand":false}]}]}}]},"generator":false,"expression":false},{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"__yieldNewProcess"},"params":[{"type":"Identifier","name":"npc"},{"type":"Identifier","name":"processName"},{"type":"Identifier","name":"args"}],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"NewExpression","callee":{"type":"MemberExpression","computed":false,"object":{"type":"Identifier","name":"rt"},"property":{"type":"Identifier","name":"Baton"}},"arguments":[{"type":"Literal","value":"newprocess","raw":"'newprocess'"},{"type":"ObjectExpression","properties":[{"type":"Property","key":{"type":"Identifier","name":"npc"},"computed":false,"value":{"type":"Identifier","name":"npc"},"kind":"init","method":false,"shorthand":false},{"type":"Property","key":{"type":"Identifier","name":"processName"},"computed":false,"value":{"type":"Identifier","name":"processName"},"kind":"init","method":false,"shorthand":false},{"type":"Property","key":{"type":"Identifier","name":"args"},"computed":false,"value":{"type":"Identifier","name":"args"},"kind":"init","method":false,"shorthand":false}]}]}}]},"generator":false,"expression":false},{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"__yieldCallFunction"},"params":[{"type":"Identifier","name":"npc"},{"type":"Identifier","name":"functionName"},{"type":"Identifier","name":"args"}],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"NewExpression","callee":{"type":"MemberExpression","computed":false,"object":{"type":"Identifier","name":"rt"},"property":{"type":"Identifier","name":"Baton"}},"arguments":[{"type":"Literal","value":"call","raw":"'call'"},{"type":"ObjectExpression","properties":[{"type":"Property","key":{"type":"Identifier","name":"npc"},"computed":false,"value":{"type":"Identifier","name":"npc"},"kind":"init","method":false,"shorthand":false},{"type":"Property","key":{"type":"Identifier","name":"functionName"},"computed":false,"value":{"type":"Identifier","name":"functionName"},"kind":"init","method":false,"shorthand":false},{"type":"Property","key":{"type":"Identifier","name":"args"},"computed":false,"value":{"type":"Identifier","name":"args"},"kind":"init","method":false,"shorthand":false}]}]}}]},"generator":false,"expression":false},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"__yieldEnd"},"init":{"type":"NewExpression","callee":{"type":"MemberExpression","computed":false,"object":{"type":"Identifier","name":"rt"},"property":{"type":"Identifier","name":"Baton"}},"arguments":[{"type":"Literal","value":"end","raw":"'end'"}]}}],"kind":"var"},{"type":"ReturnStatement","argument":{"type":"ObjectExpression","properties":[]}}]},"generator":false,"expression":false}}],"sourceType":"script"};

export {
  compile
};
