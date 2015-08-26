/* global fetch */

define([
  '/src/context.js',
  '/src/ast.js',
  '/src/templates.js'
], function (ctx, ast, templates) {
  'use strict';

  var context = newContext({
    'context': ctx,
    'ast': ast,
    'templates': templates
  });

  describe('AST translation from DIV2 to JavaScript', function () {

    var translate;

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
      context(['/src/div2trans.js'], function (trans) {
        translate = trans.translate;
        done();
      });
    });

    var programs = [
      'empty-program.prg',
      'straight-block.prg',
      'while-block.prg',
      'while-empty-block.prg',
      'while-nested-block.prg'
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
          ast = translate(abstractSyntaxTrees[0]);
          expectedAst = abstractSyntaxTrees[1];
          expect(ast.pojo()).to.be.deep.equal(expectedAst);
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
