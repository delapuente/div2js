
define([
  'div2lang',
  'div2trans'
], function (parser, translator) {
  'use strict';

  parser.yy = parser.yy || {};
  parser.yy.parseError = parser.parseError;

  return {
    parser: parser,
    translator: translator
  };

});
