define([
  '/src/div2trans.js'
], function (div2trans) {
  'use strict';

  var context = newContext({
    'div2lang': {},
    'div2trans': div2trans
  });

  describe('AST translation from DIV2 to JavaScript', function () {

    var translator;

    function samplePath(name) {
      return '/test/spec/samples/ast-translation/' + name + '.ast';
    }

    function get(path) {
      return fetch(path)
      .then(function (response) {
        return response.json();
      });
    }

    beforeEach(function (done) {
      context(['/src/div2js.js'], function (div2js) {
        translator = div2js.translator;
        done();
      });
    });

    var programs = [
      'empty-program.prg',
      'straight-block.prg'
    ];

    programs.forEach(function (programName) {
      var sourceAst = samplePath(programName);
      var targetAst = sourceAst.replace('.prg', '.js');

      it('Translates `' + sourceAst + '`', function () {
        console.log('Translation for `' + sourceAst + '`');
        var ast, expectedAst;
        return Promise.all([
          get(sourceAst),
          get(targetAst)
        ])
        .then(function (abstractSyntaxTrees) {
          ast = translator.translate(abstractSyntaxTrees[0]);
          expectedAst = abstractSyntaxTrees[1];
          expect(ast).to.be.deep.equal(expectedAst);
        })
        .catch(function (error) {
          console.error('Failed!');
          console.log('given', JSON.stringify(ast, undefined, 2));
          console.log('expec', JSON.stringify(expectedAst, undefined, 2));
          throw error;
        });
      });
    });

  });
});
