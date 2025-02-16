declare class Node {
    type: string;
    constructor(type: string);
    pojo(): any;
}
declare class AssignmentExpression extends Node {
    left: Node;
    right: Node;
    operator: string;
    type: string;
    constructor(left: Node, right: Node, operator?: string);
}
declare class ArrayExpression extends Node {
    elements: Node[];
    constructor(elements: Node[]);
}
declare class BinaryExpression extends Node {
    left: Node;
    right: Node;
    operator: string;
    type: string;
    constructor(left: Node, right: Node, operator: string);
}
declare class BlockStatement extends Node {
    body: Node[];
    constructor(statements: Node | Node[]);
}
declare class BreakStatement extends Node {
    label: string | null;
    constructor(label?: string | null);
}
declare class CallExpression extends Node {
    callee: Node;
    arguments: Node[];
    constructor(callee: Node, args?: Node[]);
}
declare class ConditionalExpression extends Node {
    test: Node;
    consequent: Node;
    alternate: Node;
    constructor(test: Node, consequent: Node, alternate: Node);
}
declare class ExpressionStatement extends Node {
    expression: Node;
    constructor(expression: Node);
}
declare class FunctionDeclaration extends Node {
    id: Node;
    params: Node[];
    defaults: Node[];
    body: BlockStatement;
    generator: boolean;
    expression: boolean;
    constructor(id: Node, params: Node[], defaults: Node[], body: Node[], generator?: boolean, expression?: boolean);
}
declare class Identifier extends Node {
    name: string;
    constructor(name: string);
}
declare class Literal extends Node {
    value: any;
    raw: any;
    constructor(value: any);
    static for(value: any): Literal | UnaryExpression;
}
declare class LogicalExpression extends Node {
    left: Node;
    right: Node;
    operator: string;
    type: string;
    constructor(left: Node, right: Node, operator: string);
}
declare class MemberExpression extends Node {
    object: Node;
    property: Node;
    computed: boolean;
    constructor(object: Node, property: Node, computed?: boolean);
}
declare class ObjectExpression extends Node {
    properties: Node[];
    constructor(properties: Node[]);
}
declare class Program extends Node {
    body: Node[];
    constructor(body: Node[]);
}
declare class ReturnStatement extends Node {
    argument: Node;
    constructor(expression: Node);
}
declare class SwitchCase extends Node {
    test: Node;
    consequent: Node[];
    constructor(test: Node, consequent?: Node[]);
}
declare class SwitchStatement extends Node {
    discriminant: Node;
    cases: Node[];
    constructor(discriminant: Node, cases: Node[]);
}
declare class UnaryExpression extends Node {
    argument: Node;
    operator: string;
    prefix: boolean;
    constructor(argument: Node, operator: string, prefix?: boolean);
}
declare class VariableDeclaration extends Node {
    declarations: Node[];
    kind: string;
    constructor(declarations: Node | Node[], kind?: string);
}
declare class VariableDeclarator extends Node {
    id: Node;
    init: Node;
    constructor(id: Node, init: Node);
}
declare class WhileStatement extends Node {
    test: Node;
    body: BlockStatement;
    constructor(condition: Node, statements: Node[]);
}
declare class IfStatement extends Node {
    test: Node;
    consequent: BlockStatement;
    alternate: BlockStatement | null;
    constructor(test: Node, consequent: Node[], alternate?: Node[] | null);
}
declare function fromJson(json: any): any;
export { AssignmentExpression, ArrayExpression, BinaryExpression, BlockStatement, BreakStatement, CallExpression, ConditionalExpression, ExpressionStatement, FunctionDeclaration, Identifier, Literal, LogicalExpression, MemberExpression, ObjectExpression, Program, ReturnStatement, SwitchCase, SwitchStatement, UnaryExpression, VariableDeclaration, VariableDeclarator, WhileStatement, IfStatement, fromJson, };
