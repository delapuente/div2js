define([
  '/src/div2lang.js'
], function (div2lang) {
  'use strict';

  var context = newContext({
    'div2lang': div2lang,
    'div2trans': {}
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
      'multiple-sentence-body.prg',
      'const.prg',
      'const-empty.prg',
      'global.prg',
      'global-empty.prg',
      'local.prg',
      'local-empty.prg',
      'private.prg',
      'private-empty.prg',
      'basic-if.prg',
      'basic-if-else.prg',
      'basic-if-else-if.prg',
      'basic-switch.prg',
      'basic-assignment.prg',
      'basic-while.prg',
      'basic-loop.prg',
      'basic-repeat.prg',
      'basic-expression.prg',
      'repeat.prg',
      'return.prg',
      'call.prg',
      'call-empty.prg',
      'basic-from.prg',
      'basic-from-step.prg',
      'basic-for.prg',
      'complete-for.prg'
    ];

    programs.forEach(function (programName) {
      var path = samplePath(programName);
      it('parses `' + path + '`', function () {
        console.log('AST for `' + path + '`');
        var ast, expectedAst;
        return Promise.all([
          fetch(path),
          fetch(samplePath(programName + '.ast'))
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
