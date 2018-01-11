/* global fetch */

define([
  '/src/ast.js',
  '/src/templates.js',
  '/src/context.js',
  '/src/memory/mapper.js',
  '/src/memory/symbols.js'
], function (ast, templates, ctx, mapper, symbols) {
  'use strict';

  var SymbolTable = symbols.SymbolTable;

  var simpleDefinitions = {
    wellKnownGlobals: ['text_z'],
    wellKnownLocals: ['x', 'y']
  };

  var context = newContext({
    'context': ctx,
    'ast': ast,
    'templates': templates,
    'memory/mapper': mapper
  });

  describe('AST translation from DIV2 to JavaScript', function () {

    var translate, checker;

    function samplePath(name) {
      return '/test/spec/samples/ast-translation/' + name + '.ast';
    }

    function get(path) {
      return fetch(path)
      .then(function (response) {
        if (response.status === 404) {
          throw new Error(path + ' does not exist.');
        }
        return response.json();
      });
    }

    beforeEach(function (done) {
      context([
        '/src/div2trans.js',
        '/src/div2checker.js'
      ], function (translateModule, checkerModule) {
        checker = checkerModule;
        translate = translateModule.translate;
        done();
      });
    });

    var programs = [
      'assignment-to-local.prg',
      'assignment-to-global.prg',
      'assignment-to-private.prg',
      'empty-program.prg', // TODO: This case is special and we should implement
                           //a less specific test, agnostic from the memory map.
      'straight-block.prg',
      'while-block.prg',
      'while-empty-block.prg',
      'while-nested-block.prg',
      'loop-block.prg',
      'loop-empty-block.prg',
      'loop-nested-block.prg',
      'private-empty.prg',
      'private.prg',
      'repeat-block.prg',
      'repeat-empty-block.prg',
      'repeat-nested-block.prg',
      'from-block.prg',
      'from-empty-block.prg',
      'from-nested-block.prg',
      'for-block.prg',
      'for-empty-block.prg',
      'for-nested-block.prg',
      'if-block.prg',
      'if-else-block.prg',
      'switch-block.prg',
      'switch-empty-block.prg',
      'switch-nested-block.prg',
      'clone.prg',
      'frame.prg',
      'frame-expression.prg',
      'return.prg',
      'return-expression.prg',
      'return-conditional.prg',
      'new-process-empty.prg',
      'new-process-arguments.prg',
      'call-function.prg',
      'debug.prg',
      'process.prg',
      'expression-priority.prg'
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
          var divAst = abstractSyntaxTrees[0];
          var symbolTable = new SymbolTable(simpleDefinitions);
          var translationContext = checker.extractContext(divAst, symbolTable);
          ast = translate(divAst, translationContext);
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
