import * as ast from "./ast";
declare const _default: {
    callWith: (name: any, args: any) => ast.CallExpression;
    concurrentBody: (cases: any) => any;
    concurrentLabel: (label: any) => ast.SwitchCase;
    readonly endToken: {
        type: string;
        name: string;
    };
    every: (tests: any) => any;
    /**
     * Builds a DIV2 AST for a FROM update.
     *
     * @return a DIV2 increment expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    fromIncrement: (name: any, constant: any) => {
        type: string;
        operator: string;
        left: {
            type: string;
            name: any;
        };
        right: {
            type: string;
            value: any;
            raw: string;
        };
    };
    /**
     * Builds a DIV2 AST for a FROM initializator.
     *
     * @return a DIV2 assignment expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    fromInitilizator: (name: any, constant: any) => {
        type: string;
        operator: string;
        left: {
            type: string;
            name: any;
        };
        right: {
            type: string;
            value: any;
            raw: string;
        };
    };
    /**
     * Builds a DIV2 AST for FROM test.
     *
     * @return a DIV2 comparison expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    fromTest: (name: any, constant: any, isLowerThan: any) => {
        type: string;
        operator: string;
        left: {
            type: string;
            name: any;
        };
        right: {
            type: string;
            value: any;
            raw: string;
        };
    };
    /**
     * Builds a DIV2 AST for the default argument for FRAME.
     *
     * @return a DIV2 comparison expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    readonly defaultFrameArgument: {
        type: string;
        value: number;
        raw: string;
    };
    /**
     * Builds a DIV2 AST for the default argument for RETURN (process id).
     *
     * @return a DIV2 comparison expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    readonly defaultReturnArgument: {
        type: string;
        name: string;
    };
    infiniteLoop: (body: any) => ast.WhileStatement;
    labeledBlock: (label: any) => ast.SwitchCase;
    memoryGlobal: (...divNames: string[][]) => any;
    memoryLocal: (...divNames: string[][]) => any;
    memoryPrivate: (...divNames: string[][]) => any;
    _memory: (index: any) => ast.MemberExpression;
    _globalAddress: (...names: string[]) => any;
    _localAddress: (...names: string[]) => any;
    _privateAddress: (...names: any[]) => any;
    _resolveAddress: (...offsets: ast.Identifier[]) => ast.Identifier | ast.BinaryExpression;
    globalSizeIdentifier: ast.Identifier;
    globalBaseIdentifier: ast.Identifier;
    identifierForGlobal: (names: any) => ast.Identifier;
    identifierForLocal: (names: any) => ast.Identifier;
    identifierForPrivate: (names: any) => ast.Identifier;
    _localBase: ast.MemberExpression;
    privateOffsetIdentifier: ast.Identifier;
    newRange: (min: any, max: any) => any;
    readonly processEnd: ast.ReturnStatement;
    call: (kind: any, resume: any, name: any, argList: any) => ast.ReturnStatement;
    processClone: (child: any, parent: any) => ast.ReturnStatement;
    processFrame: (resume: any, expression: any) => ast.ReturnStatement;
    processDebug: (resume: any) => ast.ReturnStatement;
    programFunction: (name: any, body: any) => ast.FunctionDeclaration;
    processFunction: (name: any, body: any) => ast.FunctionDeclaration;
    readonly processParameters: ast.Identifier[];
    processReturn: (expression: any) => ast.ReturnStatement;
    readonly programCounter: ast.MemberExpression;
    readonly dequeueReturnValue: ast.CallExpression;
    withProcessInitWrapper: (sentences: any[]) => ast.IfStatement;
    initializeProcessType: (processType: number) => ast.ExpressionStatement;
    processArgument: (index: any) => ast.MemberExpression;
    some: (evaluation: any, tests: any) => any;
    toBool: (ast: any) => any;
    readonly trueLiteral: ast.Literal | ast.UnaryExpression;
};
export default _default;
