import div2lang from "../../src/div2lang";
import { expect } from "chai";

div2lang.yy = div2lang.yy || {};
div2lang.yy.parseError = div2lang.parseError;

describe("DIV2 parser", function () {
  const parser = div2lang;

  function samplePath(name) {
    return "base/tests/spec/samples/" + name;
  }

  const programs = [
    "basic.prg",
    "multiple-sentence-body.prg",
    "const.prg",
    "const-empty.prg",
    "comments.prg",
    "global.prg",
    "global-empty.prg",
    "local.prg",
    "local-empty.prg",
    "private.prg",
    "private-no-type.prg",
    "private-empty.prg",
    "basic-if.prg",
    "basic-if-else.prg",
    "basic-if-else-if.prg",
    "basic-switch.prg",
    "basic-assignment.prg",
    "basic-while.prg",
    "basic-loop.prg",
    "basic-repeat.prg",
    "basic-expression.prg",
    "repeat.prg",
    "call.prg",
    "call-empty.prg",
    "basic-from.prg",
    "basic-from-step.prg",
    "basic-for.prg",
    "complete-for.prg",
    "clone.prg",
    "frame.prg",
    "frame-expression.prg",
    "return.prg",
    "return-expression.prg",
    "operators.prg",
    "debug.prg",
    "process.prg",
    "expression.prg",
    "parenthesised-expression.prg",
    "loop-with-body.prg",
    "unary-expression.prg",
  ];

  programs.forEach(function (programName) {
    const path = samplePath(programName);
    it("parses `" + path + "`", function () {
      let ast, expectedAst;
      return Promise.all([fetch(path), fetch(samplePath(programName + ".ast"))])
        .then(function (responses) {
          return Promise.all(
            responses.map(function (response) {
              return response.text();
            })
          );
        })
        .then(function (sources) {
          ast = parser.parse(sources[0]);
          expectedAst = JSON.parse(sources[1]);
          expect(ast).to.deep.equal(expectedAst);
        });
    });
  });
});
