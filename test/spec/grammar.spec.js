define(['/src/div2lang.js', '/src/scope.js'], function (div2lang, scope) {
  'use strict';

  var context = newContext({
    'div2lang': div2lang,
    'scope': scope
  });

  describe('DIV2 parser', function () {

    var parser;

    function samplePath(name) {
      return '/test/spec/samples/' + name;
    }

    beforeEach(function (done) {
      context(['/src/div2js.js'], function (div2js) {
        parser = div2js.parser;
        done();
      });
    });

    var programs = [
      'basic.prg',
      'basic-if.prg',
      'basic-if-else.prg',
      'basic-if-else-if.prg',
      'basic-switch.prg',
      'basic-assignment.prg',
      'private.prg',
      'private-empty.prg'
    ];

    programs.forEach(function (programName) {
      var path = samplePath(programName);
      it('parses `' + path + '`', function () {
        console.log('AST for `' + path + '`');
        var ast, expectedAst;
        return Promise.all([
          fetch(path),
          fetch(samplePath(programName + '.json'))
        ])
        .then(function (responses) {
          return Promise.all(responses.map(function (response) {
            return response.text();
          }));
        })
        .then(function (sources) {
          ast = parser.parse(sources[0]);
          expectedAst = JSON.parse(sources[1]);
          expect(ast).to.deep.equal(expectedAst);
        })
        .catch(function (error) {
          console.log('given', JSON.stringify(ast, undefined, 2));
          console.log('expec', JSON.stringify(expectedAst, undefined, 2));
          throw error;
        });
      });

    });
  });
});
