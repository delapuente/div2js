
define([
  'div2lang',
  'div2trans',
  'compiler'
], function (parser, translator, compiler) {
  'use strict';

  parser.yy = parser.yy || {};
  parser.yy.parseError = parser.parseError;

  return {
    parser: parser,
    translator: translator,
    compile: compiler.compile
  };

});
