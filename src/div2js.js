
define([
  'div2lang',
  'div2trans'
], function (parser, translator) {

  parser.yy = parser.yy || {};
  parser.yy.parseError = parser.parseError;

  return {
    parser: parser,
    translator: translator
  };

});
