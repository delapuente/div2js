class Node {
  pojo() {
    return JSON.parse(JSON.stringify(this));
  }
}

function AssignmentExpression(left, right, operator = "=") {
  this.type = "AssignmentExpression";
  this.operator = operator;
  this.left = left;
  this.right = right;
}
inherits(AssignmentExpression, Node);

function ArrayExpression(elements) {
  this.type = "ArrayExpression";
  this.elements = elements;
}
inherits(AssignmentExpression, Node);

function BinaryExpression(left, right, operator) {
  this.type = "BinaryExpression";
  this.operator = operator;
  this.left = left;
  this.right = right;
}
inherits(BinaryExpression, Node);

function BlockStatement(statements) {
  if (!Array.isArray(statements)) {
    statements = [statements];
  }
  this.type = "BlockStatement";
  this.body = statements;
}
inherits(BlockStatement, Node);

function BreakStatement(label = null) {
  this.type = "BreakStatement";
  this.label = label;
}
inherits(BreakStatement, Node);

function CallExpression(callee, args = []) {
  this.type = "CallExpression";
  this.callee = callee;
  this.arguments = args;
}
inherits(CallExpression, Node);

function ConditionalExpression(test, consequent, alternate) {
  this.type = "ConditionalExpression";
  this.test = test;
  this.consequent = consequent;
  this.alternate = alternate;
}
inherits(ConditionalExpression, Node);

function ExpressionStatement(expression) {
  this.type = "ExpressionStatement";
  this.expression = expression;
}
inherits(ExpressionStatement, Node);

/* jshint maxparams: 6 */
function FunctionDeclaration(
  id,
  params,
  defaults = [],
  body,
  generator = false,
  expression = false,
) {
  this.type = "FunctionDeclaration";
  this.id = id;
  this.params = params;
  this.defaults = defaults;
  this.body = new BlockStatement(body);
  this.generator = generator;
  this.expression = expression;
}
inherits(FunctionDeclaration, Node);

function Identifier(name) {
  this.type = "Identifier";
  this.name = name;
}
inherits(Identifier, Node);

class Literal extends Node {
  type;

  value;

  raw;

  constructor(value) {
    super();
    if (typeof value === "number" && value < 0) {
      throw new Error(
        "Can not construct negative literals. Negative literals are " +
          "formed by negating a positive literal. Use `Literal.for()` which " +
          "return either a literal or an expression for a negative literal.",
      );
    }
    this.type = "Literal";
    this.value = value;
    this.raw = JSON.stringify(value);
  }
  static for(value) {
    if (typeof value === "number" && value < 0) {
      return new UnaryExpression(new Literal(Math.abs(value)), "-");
    }
    return new Literal(value);
  }
}

function LogicalExpression(left, right, operator) {
  this.type = "LogicalExpression";
  this.operator = operator;
  this.left = left;
  this.right = right;
}
inherits(LogicalExpression, Node);

function MemberExpression(object, property, computed = false) {
  this.type = "MemberExpression";
  this.computed = computed;
  this.object = object;
  this.property = property;
}
inherits(MemberExpression, Node);

function ObjectExpression(properties) {
  this.type = "ObjectExpression";
  this.properties = properties;
}
inherits(ObjectExpression, Node);

function Program(body) {
  this.type = "Program";
  this.body = body;
}
inherits(Program, Node);

function ReturnStatement(expression) {
  this.type = "ReturnStatement";
  this.argument = expression;
}
inherits(ReturnStatement, Node);

function SwitchCase(test, sentences = []) {
  this.type = "SwitchCase";
  this.test = test;
  this.consequent = sentences;
}
inherits(SwitchCase, Node);

function SwitchStatement(discriminant, cases) {
  this.type = "SwitchStatement";
  this.discriminant = discriminant;
  this.cases = cases;
}
inherits(SwitchStatement, Node);

function UnaryExpression(argument, operator, prefix = true) {
  this.type = "UnaryExpression";
  this.operator = operator;
  this.argument = argument;
  this.prefix = prefix;
}
inherits(UnaryExpression, Node);

function VariableDeclaration(declarations, kind = "var") {
  if (!Array.isArray(declarations)) {
    declarations = [declarations];
  }
  this.type = "VariableDeclaration";
  this.declarations = declarations;
  this.kind = kind;
}
inherits(VariableDeclaration, Node);

function VariableDeclarator(id, init) {
  this.type = "VariableDeclarator";
  this.id = id;
  this.init = init;
}
inherits(VariableDeclarator, Node);

function WhileStatement(condition, statements) {
  this.type = "WhileStatement";
  this.test = condition;
  this.body = new BlockStatement(statements);
}
inherits(WhileStatement, Node);

function inherits(klass, base) {
  klass.prototype = Object.create(base.prototype);
  klass.prototype.constructor = klass;
}

function fromJson(json) {
  const type = typeof json;
  const isJsonSerializable = ["function", "undefined"].indexOf(type) === -1;
  if (!isJsonSerializable) {
    return undefined;
  }
  if (Array.isArray(json)) {
    const elements = json.map(function (item) {
      const value = fromJson(item);
      if (typeof value === "undefined") {
        return new Literal(null);
      }
      return value;
    });
    return new ArrayExpression(elements);
  } else if (type === "object") {
    const properties = Object.keys(json)
      .map(function (key) {
        const value = fromJson(json[key]);
        if (typeof value === "undefined") {
          return undefined;
        }
        return {
          type: "Property",
          key: Literal["for"](key),
          computed: false,
          value: value,
          kind: "init",
          method: false,
          shorthand: false,
        };
      })
      .filter(function (property) {
        return typeof property !== "undefined";
      });
    return new ObjectExpression(properties);
  } else {
    return Literal["for"](json);
  }
}

export {
  AssignmentExpression,
  ArrayExpression,
  BinaryExpression,
  BlockStatement,
  BreakStatement,
  CallExpression,
  ConditionalExpression,
  ExpressionStatement,
  FunctionDeclaration,
  Identifier,
  Literal,
  LogicalExpression,
  MemberExpression,
  ObjectExpression,
  Program,
  ReturnStatement,
  SwitchCase,
  SwitchStatement,
  UnaryExpression,
  VariableDeclaration,
  VariableDeclarator,
  WhileStatement,
  fromJson,
};
