
define([], function () {
  'use strict';

  function Node() {}

  Node.prototype.pojo = function () {
    return JSON.parse(JSON.stringify(this));
  };

  function AssignmentExpression(left, right, operator) {
    operator = operator || '=';
    this.type = 'AssignmentExpression';
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
  inherits(AssignmentExpression, Node);

  function BinaryExpression(left, right, operator) {
    this.type = 'BinaryExpression';
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
  inherits(BinaryExpression, Node);

  function BlockStatement(statements) {
    if (!Array.isArray(statements)) { statements = [statements]; }
    this.type = 'BlockStatement';
    this.body = statements;
  }
  inherits(BlockStatement, Node);

  function BreakStatement(label) {
    this.type = 'BreakStatement';
    this.label = label || null;
  }
  inherits(BreakStatement, Node);

  function CallExpression(callee, args) {
    this.type = 'CallExpression';
    this.callee = callee;
    this.arguments = args;
  }
  inherits(CallExpression, Node);

  function ConditionalExpression(test, consequent, alternate) {
    this.type = 'ConditionalExpression';
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
  }
  inherits(ConditionalExpression, Node);

  function ExpressionStatement(expression) {
    this.type = 'ExpressionStatement';
    this.expression = expression;
  }
  inherits(ExpressionStatement, Node);

  /* jshint maxparams: 6 */
  function FunctionDeclaration(id, params, defaults, body,
                               generator, expression) {
    this.type = 'FunctionDeclaration';
    this.id = id || null;
    this.params = params || [];
    this.defaults = defaults || [];
    this.body = new BlockStatement(body);
    this.generator = generator || false;
    this.expression = expression || false;
  }
  inherits(FunctionDeclaration, Node);

  function Identifier(name) {
    this.type = 'Identifier';
    this.name = name;
  }
  inherits(Identifier, Node);

  function Literal(value) {
    if (typeof value === 'number' && value < 0) {
      throw new Error(
        'Can not construct negative literals. Negative literals are ' +
        'formed by negating a positive literal. Use `Literal.for()` which ' +
        'return either a literal or an expression for a negative literal.'
      );
    }
    this.type = 'Literal';
    this.value = value;
    this.raw = JSON.stringify(value);
  }
  inherits(Literal, Node);

  Literal.for = function (value, raw) {
    if (typeof value === 'number' && value < 0) {
      return new UnaryExpression(new Literal(Math.abs(value)), '-');
    }
    return new Literal(value);
  };

  function LogicalExpression(left, right, operator) {
    this.type = 'LogicalExpression';
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
  inherits(LogicalExpression, Node);

  function MemberExpression(object, property, computed) {
    this.type = 'MemberExpression',
    this.computed = computed || false;
    this.object = object;
    this.property = property;
  }
  inherits(MemberExpression, Node);

  function Program(body) {
    this.type = 'Program';
    this.body = body;
  }
  inherits(Program, Node);

  function ReturnStatement(expression) {
    this.type = 'ReturnStatement';
    this.argument = expression || null;
  }
  inherits(ReturnStatement, Node);

  function SwitchCase(test, sentences) {
    this.type = 'SwitchCase';
    this.test = test;
    this.consequent = sentences || [];
  }
  inherits(SwitchCase, Node);

  function SwitchStatement(discriminant, cases) {
    this.type = 'SwitchStatement';
    this.discriminant = discriminant;
    this.cases = cases || [];
  }
  inherits(SwitchStatement, Node);

  function UnaryExpression(argument, operator, prefix) {
    this.type = 'UnaryExpression';
    this.operator = operator;
    this.argument = argument;
    this.prefix = typeof prefix === 'undefined' ? true : prefix;
  }
  inherits(UnaryExpression, Node);

  function VariableDeclaration(declarations, kind) {
    if (!Array.isArray(declarations)) { declarations = [declarations]; }
    this.type = 'VariableDeclaration';
    this.declarations = declarations;
    this.kind = kind || 'var';
  }
  inherits(VariableDeclaration, Node);

  function VariableDeclarator(id, init) {
    this.type = 'VariableDeclarator';
    this.id = id;
    this.init = init;
  }
  inherits(VariableDeclarator, Node);

  function WhileStatement(condition, statements) {
    this.type = 'WhileStatement';
    this.test = condition;
    this.body = new BlockStatement(statements);
  }
  inherits(WhileStatement, Node);

  function inherits(klass, base) {
    klass.prototype = Object.create(base.prototype);
    klass.prototype.constructor = klass;
  }

  return {
    AssignmentExpression: AssignmentExpression,
    BinaryExpression: BinaryExpression,
    BlockStatement: BlockStatement,
    BreakStatement: BreakStatement,
    CallExpression: CallExpression,
    ConditionalExpression: ConditionalExpression,
    ExpressionStatement: ExpressionStatement,
    FunctionDeclaration: FunctionDeclaration,
    Identifier: Identifier,
    Literal: Literal,
    LogicalExpression: LogicalExpression,
    MemberExpression: MemberExpression,
    Program: Program,
    ReturnStatement: ReturnStatement,
    SwitchCase: SwitchCase,
    SwitchStatement: SwitchStatement,
    UnaryExpression: UnaryExpression,
    VariableDeclaration: VariableDeclaration,
    VariableDeclarator: VariableDeclarator,
    WhileStatement: WhileStatement
  };
});
