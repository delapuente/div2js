
define([], function () {
  'use strict';

  function Node() {}

  Node.prototype.pojo = function () {
    return JSON.parse(JSON.stringify(this));
  };

  function BlockStatement(statements) {
    if (!Array.isArray(statements)) { statements = [statements] };
    this.type = 'BlockStatement';
    this.body = statements;
  };
  inherits(BlockStatement, Node);

  function BreakStatement(label) {
    this.type = 'BreakStatement';
    this.label = label || null;
  };
  inherits(BreakStatement, Node);

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
  };
  inherits(Identifier, Node);

  function Literal(value, raw) {
    this.type = 'Literal';
    this.value = value;
    this.raw = raw || JSON.stringify(value);
  };
  inherits(Literal, Node);

  function Program(body) {
    this.type = 'Program';
    this.body = body;
  };
  inherits(Program, Node);

  function ReturnStatement(expression) {
    this.type = 'ReturnStatement';
    this.argument = expression || null;
  };
  inherits(ReturnStatement, Node);

  function SwitchCase(test, sentences) {
    this.type = 'SwitchCase';
    this.test = test;
    this.consequent = sentences || [];
  };
  inherits(SwitchCase, Node);

  function SwitchStatement(discriminant, cases) {
    this.type = 'SwitchStatement';
    this.discriminant = discriminant;
    this.cases = cases || [];
  };
  inherits(SwitchStatement, Node);

  function WhileStatement(condition, statements) {
    this.type = 'WhileStatement';
    this.test = condition;
    this.body = new BlockStatement(statements);
  };
  inherits(WhileStatement, Node);

  function inherits(klass, base) {
    klass.prototype = Object.create(base.prototype);
    klass.prototype.constructor = klass;
  }

  return {
    BlockStatement: BlockStatement,
    BreakStatement: BreakStatement,
    FunctionDeclaration: FunctionDeclaration,
    Identifier: Identifier,
    Literal: Literal,
    Program: Program,
    ReturnStatement: ReturnStatement,
    SwitchCase: SwitchCase,
    SwitchStatement: SwitchStatement,
    WhileStatement: WhileStatement
  };
});
