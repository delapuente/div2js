import * as translator from "../../src/div2trans";
import * as checker from "../../src/div2checker";
import { SymbolTable } from "../../src/memoryBrowser/symbols";
import { expect } from "chai";
import {
  WellKnownSymbols,
  normalize,
} from "../../src/memoryBrowser/definitions";

const simpleDefinitions: WellKnownSymbols = {
  wellKnownGlobals: [
    normalize("text_z"),
    normalize({
      type: "struct",
      name: "mouse",
      fields: ["x"],
    }),
  ],
  wellKnownLocals: [normalize("x"), normalize("y")],
  wellKnownConstants: [normalize({ name: "pi", default: 180000 })],
};

describe("AST translation from DIV2 to JavaScript", function () {
  const translate = translator.translate;

  function samplePath(name) {
    return "base/tests/spec/samples/ast-translation/" + name + ".ast";
  }

  function get(path) {
    return fetch(path).then(function (response) {
      if (response.status === 404) {
        throw new Error(path + " does not exist.");
      }
      return response.json();
    });
  }

  const programs = [
    "assignment-to-local.prg",
    "assignment-to-global.prg",
    "assignment-to-private.prg",
    "empty-program.prg", // TODO: This case is special and we should implement
    //a less specific test, agnostic from the memory map.
    "straight-block.prg",
    "while-block.prg",
    "while-empty-block.prg",
    "while-nested-block.prg",
    "loop-block.prg",
    "loop-empty-block.prg",
    "loop-nested-block.prg",
    "private-empty.prg",
    "repeat-block.prg",
    "repeat-empty-block.prg",
    "repeat-nested-block.prg",
    "from-block.prg",
    "from-empty-block.prg",
    "from-nested-block.prg",
    "for-block.prg",
    "for-empty-block.prg",
    "for-nested-block.prg",
    "if-block.prg",
    "if-else-block.prg",
    "switch-block.prg",
    "switch-empty-block.prg",
    "switch-nested-block.prg",
    "clone.prg",
    "frame.prg",
    "frame-expression.prg",
    "return.prg",
    "return-expression.prg",
    "return-conditional.prg",
    "new-process-empty.prg",
    "new-process-arguments.prg",
    "call-function.prg",
    "debug.prg",
    // TODO: The process.js.ast is not correct. Since there is no Unit AST from
    // wich to extract process types, it cannot correctly resolve the
    // initialization and the AST contains a ill Literal node.
    "process.prg",
    "expression-priority.prg",
    "unary-expression.prg",
    "constant-expression.prg",
    "member-expression.prg",
  ];

  programs.forEach(function (programTestCase) {
    const [onlyFlag, programName] =
      typeof programTestCase === "string"
        ? [false, programTestCase]
        : programTestCase;
    const itFn = onlyFlag ? it.only.bind(it) : it;
    const sourceAst = samplePath(programName);
    const targetAst = sourceAst.replace(".prg", ".js");

    itFn("Translates `" + sourceAst + "`", function () {
      let ast, expectedAst;
      return Promise.all([get(sourceAst), get(targetAst)]).then(
        function (abstractSyntaxTrees) {
          const divAst = abstractSyntaxTrees[0];
          const symbolTable = new SymbolTable(simpleDefinitions);
          const translationContext = checker.extractContext(
            divAst,
            symbolTable,
          );
          ast = translate(findTestNode(divAst) || divAst, translationContext);
          expectedAst = abstractSyntaxTrees[1];
          expect(ast.pojo()).to.be.deep.equal(expectedAst);
        },
      );
    });
  });

  function findTestNode(ast) {
    if (ast.$testNode$) {
      return ast;
    }
    let testNode = null;
    const keys = Object.keys(ast);
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i];
      const property = ast[key];
      if (property && typeof property === "object") {
        testNode = findTestNode(ast[key]);
        if (testNode) {
          return testNode;
        }
      }
    }
    return testNode;
  }
});
