class Node {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  pojo() {
    return JSON.parse(JSON.stringify(this));
  }
}

class AssignmentExpression extends Node {
  left: Node;
  right: Node;
  operator: string;
  type: string;

  constructor(left: Node, right: Node, operator = "=") {
    super("AssignmentExpression");
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
}

class ArrayExpression extends Node {
  elements: Node[];

  constructor(elements: Node[]) {
    super("ArrayExpression");
    this.elements = elements;
  }
}

class BinaryExpression extends Node {
  left: Node;
  right: Node;
  operator: string;
  type: string;

  constructor(left: Node, right: Node, operator: string) {
    super("BinaryExpression");
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
}

class BlockStatement extends Node {
  body: Node[];

  constructor(statements: Node | Node[]) {
    super("BlockStatement");
    this.body = Array.isArray(statements) ? statements : [statements];
  }
}

class BreakStatement extends Node {
  label: string | null;

  constructor(label: string | null = null) {
    super("BreakStatement");
    this.label = label;
  }
}

class CallExpression extends Node {
  callee: Node;
  arguments: Node[];

  constructor(callee: Node, args: Node[] = []) {
    super("CallExpression");
    this.callee = callee;
    this.arguments = args;
  }
}

class ConditionalExpression extends Node {
  test: Node;
  consequent: Node;
  alternate: Node;

  constructor(test: Node, consequent: Node, alternate: Node) {
    super("ConditionalExpression");
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
  }
}

class ExpressionStatement extends Node {
  expression: Node;

  constructor(expression: Node) {
    super("ExpressionStatement");
    this.expression = expression;
  }
}

class FunctionDeclaration extends Node {
  id: Node;
  params: Node[];
  defaults: Node[];
  body: BlockStatement;
  generator: boolean;
  expression: boolean;

  constructor(
    id: Node,
    params: Node[],
    defaults: Node[] = [],
    body: Node[],
    generator = false,
    expression = false,
  ) {
    super("FunctionDeclaration");
    this.id = id;
    this.params = params;
    this.defaults = defaults;
    this.body = new BlockStatement(body);
    this.generator = generator;
    this.expression = expression;
  }
}

class Identifier extends Node {
  name: string;

  constructor(name: string) {
    super("Identifier");
    this.name = name;
  }
}

class Literal extends Node {
  value;

  raw;

  constructor(value) {
    if (typeof value === "number" && value < 0) {
      throw new Error(
        "Can not construct negative literals. Negative literals are " +
          "formed by negating a positive literal. Use `Literal.for()` which " +
          "return either a literal or an expression for a negative literal.",
      );
    }
    super("Literal");
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

class LogicalExpression extends Node {
  left: Node;
  right: Node;
  operator: string;
  type: string;

  constructor(left: Node, right: Node, operator: string) {
    super("LogicalExpression");
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
}

class MemberExpression extends Node {
  object: Node;
  property: Node;
  computed: boolean;

  constructor(object: Node, property: Node, computed = false) {
    super("MemberExpression");
    this.object = object;
    this.property = property;
    this.computed = computed;
  }
}

class ObjectExpression extends Node {
  properties: Node[];

  constructor(properties: Node[]) {
    super("ObjectExpression");
    this.properties = properties;
  }
}

class Program extends Node {
  body: Node[];

  constructor(body: Node[]) {
    super("Program");
    this.body = body;
  }
}

class ReturnStatement extends Node {
  argument: Node;

  constructor(expression: Node) {
    super("ReturnStatement");
    this.argument = expression;
  }
}

class SwitchCase extends Node {
  test: Node;
  consequent: Node[];

  constructor(test: Node, consequent: Node[] = []) {
    super("SwitchCase");
    this.test = test;
    this.consequent = consequent;
  }
}

class SwitchStatement extends Node {
  discriminant: Node;
  cases: Node[];

  constructor(discriminant: Node, cases: Node[]) {
    super("SwitchStatement");
    this.discriminant = discriminant;
    this.cases = cases;
  }
}

class UnaryExpression extends Node {
  argument: Node;
  operator: string;
  prefix: boolean;

  constructor(argument: Node, operator: string, prefix = true) {
    super("UnaryExpression");
    this.operator = operator;
    this.argument = argument;
    this.prefix = prefix;
  }
}

class VariableDeclaration extends Node {
  declarations: Node[];
  kind: string;

  constructor(declarations: Node | Node[], kind = "var") {
    super("VariableDeclaration");
    this.declarations = Array.isArray(declarations)
      ? declarations
      : [declarations];
    this.kind = kind;
  }
}

class VariableDeclarator extends Node {
  id: Node;
  init: Node;

  constructor(id: Node, init: Node) {
    super("VariableDeclarator");
    this.id = id;
    this.init = init;
  }
}

class WhileStatement extends Node {
  test: Node;
  body: BlockStatement;

  constructor(condition: Node, statements: Node[]) {
    super("WhileStatement");
    this.test = condition;
    this.body = new BlockStatement(statements);
  }
}

class IfStatement extends Node {
  test: Node;
  consequent: BlockStatement;
  alternate: BlockStatement | null;

  constructor(test: Node, consequent: Node[], alternate: Node[] | null = null) {
    super("IfStatement");
    this.test = test;
    this.consequent = new BlockStatement(consequent);
    this.alternate = alternate ? new BlockStatement(alternate) : null;
  }
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
  IfStatement,
  fromJson,
};
