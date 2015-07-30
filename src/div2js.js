
define(['div2lang', 'scope'], function (parser, scope) {

  parser.yy = scope;
  parser.yy.parseError = parser.parseError;

  return {
    parser: parser
  };

});
