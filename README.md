# DIV2JS

DIV2JS is a transpiler of DIV2 for the modern web. In experimental stage right now, DIV2JS tries to be a perfect simulator for the DIV2 language.

## Install

Clone the repository and in the root folder install dependencies by typing:

```bash
$ npm install
```

Now enter in the `test` folder and run:

```bash
$ bower install
```

Exit `test` folder and finally, run in the root:

```bash
$ grunt
```

Tests will fail because they can only run in browsers. We will be moving to Karma to solve this issue.

## Usage

DIV2JS is not usable yet. The grammar is partially implemented and not completely correct and the translation lacks from the code generator. Furthermore, no runtime has been provided yet nor the graphic engine...

## Then... what's done? 

If you run:

```bash
$ grunt debug
```

And navigate to `http://localhost:9002/` you will enter the test runner. These tests check parsing and AST translation. You can see parsing examples in the `test/spec/samples/`. Files with `*.prg` extension are DIV2 source code while files with `*.ast` extension are JSON files with the abstract syntax tree for those programs. In the `test/spec/samples/ast-translation/` folder you will find translations between DIV2 ASTs and [JavaScript AST](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects).

## So, what's next?

There are tons of work pending yet. Take a look at [milestones](https://github.com/delapuente/div2js/milestones) and [issues](https://github.com/delapuente/div2js/issues) for details of the current status.
