import * as ast from "./ast";

export default {
  callWith: function (name, args) {
    if (!Array.isArray(args)) {
      args = args ? [args] : [];
    }
    return new ast.CallExpression(new ast.Identifier(name), args);
  },

  concurrentBody: function (cases) {
    const programCounter = this.programCounter;
    const switchStatement = new ast.SwitchStatement(programCounter, cases);
    return this.infiniteLoop(switchStatement);
  },

  concurrentLabel: function (label) {
    return new ast.SwitchCase(ast.Literal.for(label));
  },

  get endToken() {
    return {
      type: "Identifier",
      name: "__yieldEnd",
    };
  },

  every: function (tests) {
    return tests.reduce(function (chain, test) {
      return chain === null
        ? test
        : new ast.LogicalExpression(chain, test, "&&");
    }, null);
  },

  /**
   * Builds a DIV2 AST for a FROM update.
   *
   * @return a DIV2 increment expression.
   * TODO: Maybe a set of DIV2 constructors is actually needed.
   */
  fromIncrement: function (name, constant) {
    return {
      type: "AssignmentExpression",
      operator: "+=",
      left: {
        type: "Identifier",
        name: name,
      },
      right: {
        type: "Literal",
        value: constant,
        raw: JSON.stringify(constant),
      },
    };
  },

  /**
   * Builds a DIV2 AST for a FROM initializator.
   *
   * @return a DIV2 assignment expression.
   * TODO: Maybe a set of DIV2 constructors is actually needed.
   */
  fromInitilizator: function (name, constant) {
    return {
      type: "AssignmentExpression",
      operator: "=",
      left: {
        type: "Identifier",
        name: name,
      },
      right: {
        type: "Literal",
        value: constant,
        raw: JSON.stringify(constant),
      },
    };
  },

  /**
   * Builds a DIV2 AST for FROM test.
   *
   * @return a DIV2 comparison expression.
   * TODO: Maybe a set of DIV2 constructors is actually needed.
   */
  fromTest: function (name, constant, isLowerThan) {
    return {
      type: "BinaryExpression",
      operator: isLowerThan ? "<=" : ">=",
      left: {
        type: "Identifier",
        name: name,
      },
      right: {
        type: "Literal",
        value: constant,
        raw: JSON.stringify(constant),
      },
    };
  },

  /**
   * Builds a DIV2 AST for the default argument for FRAME.
   *
   * @return a DIV2 comparison expression.
   * TODO: Maybe a set of DIV2 constructors is actually needed.
   */
  get defaultFrameArgument() {
    return {
      type: "Literal",
      value: 100,
      raw: "100",
    };
  },

  /**
   * Builds a DIV2 AST for the default argument for RETURN (process id).
   *
   * @return a DIV2 comparison expression.
   * TODO: Maybe a set of DIV2 constructors is actually needed.
   */
  get defaultReturnArgument() {
    return {
      type: "Identifier",
      name: "id",
    };
  },

  infiniteLoop: function (body) {
    return new ast.WhileStatement(this.trueLiteral, body);
  },

  labeledBlock: function (label) {
    return new ast.SwitchCase(ast.Literal.for(label));
  },

  memoryGlobal: function (...divNames: string[][]) {
    return this._memory(this._globalAddress(...divNames));
  },

  memoryLocal: function (...divNames: string[][]) {
    return this._memory(this._localAddress(...divNames));
  },

  memoryPrivate: function (...divNames: string[][]) {
    return this._memory(this._privateAddress(...divNames));
  },

  _memory: function (index) {
    return new ast.MemberExpression(new ast.Identifier("mem"), index, true);
  },

  // XXX: Returns ast for `__G_SEGMENT_BASE + G_<NAME>`
  _globalAddress: function (...names: string[]) {
    return this._resolveAddress(
      this.globalBaseIdentifier,
      ...names.map((name) => this.identifierForGlobal(name)),
    );
  },

  // XXX: Returns ast for `exec.base + L_<NAME>`
  _localAddress: function (...names: string[]) {
    return this._resolveAddress(
      this._localBase,
      ...names.map((name) => this.identifierForLocal(name)),
    );
  },

  // XXX: Returns ast for `exec.base + __P_SEGMENT_OFFSET + <name>`
  _privateAddress: function (...names) {
    return this._resolveAddress(
      this._localBase,
      this.privateOffsetIdentifier,
      ...names.map((name) => this.identifierForPrivate(name)),
    );
  },

  // XXX: Returns an expression of the form OFFSET_0 + OFFSET_1 + ... + OFFSET_N
  // aimed at resolving the address of a variable in memory.
  // TODO: Maybe expand to handle arrays by accepting numbers?
  _resolveAddress: function (...offsets: ast.Identifier[]) {
    if (offsets.length === 1) {
      return offsets[0];
    }
    const lastOffset = offsets.pop();
    return new ast.BinaryExpression(
      this._resolveAddress(...offsets),
      lastOffset,
      "+",
    );
  },

  globalSizeIdentifier: new ast.Identifier("__G_SEGMENT_SIZE"),

  globalBaseIdentifier: new ast.Identifier("__G_SEGMENT_OFFSET"),

  identifierForGlobal: function (names) {
    return new ast.Identifier(["G"].concat(names).join("_").toUpperCase());
  },

  identifierForLocal: function (names) {
    return new ast.Identifier(["L"].concat(names).join("_").toUpperCase());
  },

  identifierForPrivate: function (names) {
    // XXX: Privates have no prefix. Still, we concatenate with the empty
    // sequence to deal with names being a sring, or an array of strings.
    return new ast.Identifier([].concat(names).join("_").toLowerCase());
  },

  _localBase: new ast.MemberExpression(
    new ast.Identifier("exec"),
    new ast.Identifier("processId"),
    false,
  ),

  privateOffsetIdentifier: new ast.Identifier("__P_SEGMENT_OFFSET"),

  newRange: function (min, max) {
    return this.callWith("__range", [min, max]);
  },

  get processEnd() {
    return new ast.ReturnStatement(this.endToken);
  },

  call: function (kind, resume, name, argList) {
    const yieldType = {
      function: "__yieldCallFunction",
      process: "__yieldNewProcess",
    }[kind];
    return new ast.ReturnStatement(
      this.callWith(
        yieldType,
        [ast.Literal.for(resume), ast.Literal.for(name)].concat(argList),
      ),
    );
  },

  processClone: function (child, parent) {
    return new ast.ReturnStatement(
      this.callWith("__yieldClone", [
        ast.Literal.for(child),
        ast.Literal.for(parent),
      ]),
    );
  },

  // TODO: Ok, the former means process clone but what does this mean?
  // It is not "process frame", it is just frame.
  processFrame: function (resume, expression) {
    return new ast.ReturnStatement(
      this.callWith("__yieldFrame", [ast.Literal.for(resume), expression]),
    );
  },

  // TODO: Same here.
  processDebug: function (resume) {
    return new ast.ReturnStatement(
      this.callWith("__yieldDebug", [ast.Literal.for(resume)]),
    );
  },

  programFunction: function (name, body) {
    return new ast.FunctionDeclaration(
      new ast.Identifier("program_" + name),
      this.processParameters,
      undefined,
      body,
    );
  },

  processFunction: function (name, body) {
    return new ast.FunctionDeclaration(
      new ast.Identifier("process_" + name),
      this.processParameters,
      undefined,
      body,
    );
  },

  // TODO: Maybe mem, exec & args should be supplied by div2trans
  get processParameters() {
    return [
      new ast.Identifier("mem"),
      new ast.Identifier("exec"),
      new ast.Identifier("args"),
    ];
  },

  // TODO: See my comment about processFrame. I don't think this should be
  // different for a process than for a function.
  processReturn: function (expression) {
    return new ast.ReturnStatement(this.callWith("__yieldReturn", expression));
  },

  get programCounter() {
    return new ast.MemberExpression(
      new ast.Identifier("exec"),
      new ast.Identifier("pc"),
    );
  },

  get dequeueReturnValue() {
    return new ast.CallExpression(
      new ast.MemberExpression(
        new ast.MemberExpression(
          new ast.Identifier("exec"),
          new ast.Identifier("retv"),
        ),
        new ast.Identifier("dequeue"),
      ),
    );
  },

  withProcessInitWrapper: function (sentences: any[]): ast.IfStatement {
    return new ast.IfStatement(
      new ast.UnaryExpression(
        new ast.MemberExpression(
          new ast.Identifier("exec"),
          new ast.Identifier("initialized"),
        ),
        "!",
      ),
      sentences.concat(
        new ast.ExpressionStatement(
          new ast.AssignmentExpression(
            new ast.MemberExpression(
              new ast.Identifier("exec"),
              new ast.Identifier("initialized"),
            ),
            new ast.Literal(true),
          ),
        ),
      ),
    );
  },

  initializeProcessType: function (processType: number) {
    return new ast.ExpressionStatement(
      new ast.AssignmentExpression(
        this.memoryLocal(["reserved"], ["reserved", "process_type"]),
        ast.Literal["for"](processType),
      ),
    );
  },

  processArgument: function (index) {
    return new ast.MemberExpression(
      new ast.Identifier("args"),
      new ast.Literal(index),
      true,
    );
  },

  some: function (evaluation, tests) {
    return this.callWith("__some", [evaluation].concat(tests));
  },

  toBool: function (ast) {
    return this.callWith("__bool", ast);
  },

  get trueLiteral() {
    return ast.Literal.for(true);
  },
};
