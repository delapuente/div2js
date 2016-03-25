
define([
  'div2lang',
  'div2trans',
  'lib/escodegen'
], function (parser, translator, generator) {
  'use strict';

  function compile(srcText) {
    var div2Ast = parser.parse(srcText);
    var jsAst = translator.translate(div2Ast);
    var objText = generator.generate(jsAst);
    return Promise.resolve(objText);
  }

  return {
    compile: compile
  };
});
