/* global fetch */

define([
  '/src/context.js',
  '/src/ast.js',
  '/src/templates.js',
  '/src/memory/mapper.js'
], function (ctx, ast, templates, mapper) {
  'use strict';

  var testDefinitions = {
    wellKnownGlobals: [
      "text_z"
    ],
    wellKnownLocals: []
  };

  var context = newContext({
    'context': ctx,
    'ast': ast,
    'templates': templates,
    'memory/definitions': testDefinitions
  });

  describe('AST translation from DIV2 to JavaScript', function () {

    var translate, symbols;

    function setupTranslationContext() {
      var prototype = ctx.Context.prototype;
      var isProcessStub = sinon.stub(prototype, 'isProcess');
      var getScopeStub = sinon.stub(prototype, 'getScope');
      isProcessStub.withArgs('p1').returns(true);
      isProcessStub.withArgs('f1').returns(false);
      getScopeStub.withArgs('text_z').returns('global');
      getScopeStub.withArgs('x').returns('local');
      getScopeStub.withArgs('y').returns('local');
      getScopeStub.withArgs('id').returns('local');
      getScopeStub.withArgs('i').returns('private');
      getScopeStub.withArgs('j').returns('private');
      getScopeStub.withArgs('a').returns('private');
      getScopeStub.withArgs('b').returns('private');
      getScopeStub.withArgs('c').returns('private');
    }

    function restoreTranslationContext() {
      var prototype = ctx.Context.prototype;
      prototype.isProcess.restore();
      prototype.getScope.restore();
    }

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
      setupTranslationContext();
      context([
        '/src/div2trans.js',
        '/src/memory/symbols.js'
      ], function (trans, syms) {
        symbols = syms;
        translate = trans.translate;
        done();
      });
    });

    afterEach(function () {
      restoreTranslationContext();
    });

    var programs = [
      'assignment.prg',
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
          var translationContext = new ctx.Context();
          translationContext.setMemoryMap(new mapper.MemoryMap(symbols));
          ast = translate(abstractSyntaxTrees[0], translationContext);
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
