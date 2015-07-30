define(['/src/div2lang.js', '/src/scope.js'], function (div2lang, scope) {
  'use strict';

  var context = newContext({
    'div2lang': div2lang,
    'scope': scope
  });

  describe('Code generator for program and processes', function () {

    var parser;

    function samplePath(name) {
      return '/test/spec/samples/code-generation/' + name;
    }

    function translateFile(path) {
      return fetch(path)
      .then(function (response) {
        return response.text();
      })
      .then(function (source) {
        var target = parser.parse(source).target;
        console.log(target);
        return parser.parse(source).target;
      })
      .then(function (target) {
        return ast(esprima.parse(target));
      });
    }

    function parseFile(path) {
      return fetch(path)
      .then(function (response) {
        return response.text();
      })
      .then(function (source) {
        return ast(esprima.parse(source));
      });
    }

    function ast(esprimaResult) {
      return JSON.parse(JSON.stringify(esprimaResult));
    }

    beforeEach(function (done) {
      context(['/src/div2js.js'], function (div2js) {
        parser = div2js.parser;
        done();
      });
    });

    var programs = [
      'empty-program.prg',
      'straight-block.prg'
    ];

    programs.forEach(function (programName) {
      var path = samplePath(programName);
      it('Translates `' + path + '`', function () {
        console.log('Target for `' + path + '`');
        var ast, expectedAst;
        return Promise.all([
          translateFile(path),
          parseFile(samplePath(programName + '.js'))
        ])
        .then(function (abstractSyntaxTrees) {
          ast = abstractSyntaxTrees[0];
          expectedAst = abstractSyntaxTrees[1];
          expect(ast).to.be.deep.equal(expectedAst);
        })
        .catch(function (error) {
          console.error('Failed!');
          console.log('given', ast);
          console.log('expec', expectedAst);
          throw error;
        });
      });
    });

  });
});
