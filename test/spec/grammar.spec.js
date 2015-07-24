define([], function () {
  'use strict';

  var context = newContext();

  describe('DIV2 parser', function () {

    var parser;

    function samplePath(name) {
      return '/test/spec/samples/' + name;
    }

    beforeEach(function (done) {
      context(['/src/div2lang.js'], function (div2langModule) {
        parser = div2langModule;
        // Workaround for https://github.com/zaach/jison/issues/209
        parser.yy.parseError = parser.parseError;
        done();
      });
    });

    var programs = [
      'basic.prg',
      'private.prg',
      'private-empty.prg'
    ];

    programs.forEach(function (programName) {

      it('parses `' + samplePath(programName) + '`', function () {
        return fetch(samplePath(programName))
        .then(function (response) {
          return response.text();
        })
        .then(function (program) {
          expect(parser.parse(program)).to.be.ok;
        });
      });

    });
  });
});
