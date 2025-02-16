import * as ast from "./ast";
import { MemoryMap } from "./memoryBrowser/mapper";
import { SymbolTable } from "./memoryBrowser/symbols";
type Scope = "global" | "local" | "private";
declare class Context {
    private readonly _symbolTable;
    private _processes;
    private _auxNames;
    private _currentProcess;
    private _currentLinearization;
    private _mmap?;
    private _nextProcessTypeValue;
    constructor(_symbolTable: SymbolTable);
    calculateMemoryMap(): MemoryMap;
    getMemoryMap(): MemoryMap;
    startLinearization(): void;
    getLinearizationCases(): any;
    end(): any;
    callFunction(resumeLabel: any, name: any, argList: any): any;
    newProcess(resumeLabel: any, name: any, argList: any): any;
    clone(childLabel: any, parentLabel: any): any;
    frame(resumeLabel: any, expression: any): any;
    debug(resumeLabel: any): any;
    getProcessTypeValue(name: any): any;
    declareProcess(name: any): void;
    declareGlobal(name: any): void;
    declareLocal(name: any): void;
    declarePrivate(processName: any, name: any): void;
    isProcess(name: any): boolean;
    isSomeGlobalName(name: any): boolean;
    isPrivate(processName: any, name: any): boolean;
    isSomePrivate(name: any): boolean;
    enterProcess(name: any): void;
    exitProcess(): void;
    return(expression: any): any;
    newAux(name: any, initializer: any): {
        identifier: ast.Identifier;
        declaration: ast.VariableDeclaration;
    };
    newLabel(): any;
    label(label: any): any;
    verbatim(ast: any): any;
    goToIf(testAst: any, labelIfTrue: any, labelIfFalse: any): any;
    goTo(label: any): any;
    select(evaluation: any, options: any, defaultLabel: any): any;
    getScope(identifier: any): any;
    constantValue(identifier: any): any;
    _nextProcessType(): number;
}
declare class Linearization {
    private _pc;
    private _sentences;
    constructor();
    getCases(): any[];
    newLabel(): Label;
    label(label: any): void;
    verbatim(sentence: any): void;
    goToIf(testAst: any, labelIfTrue: any, labelIfFalse: any): void;
    goTo(label: any): void;
    select(evaluation: any, options: any, defaultLabel: any): void;
    end(): void;
    callFunction(resumeLabel: any, name: any, argList: any): void;
    newProcess(resumeLabel: any, name: any, argList: any): void;
    clone(childLabel: any, parentLabel: any): void;
    frame(resumeLabel: any, expression: any): void;
    debug(resumeLabel: any): void;
    return(expression: any): void;
    _verbatim(sentence: any): {
        type: string;
        sentences: any[];
    };
    _goToIf(testAst: any, labelIfTrue: any, labelIfFalse: any): {
        type: string;
        readonly sentences: (ast.ExpressionStatement | ast.BreakStatement)[];
    };
    _goTo(label: any): {
        type: string;
        readonly sentences: (ast.ExpressionStatement | ast.BreakStatement)[];
    };
    _select(evaluation: any, options: any, defaultLabel: any): {
        type: string;
        readonly sentences: any[];
    };
    _end(): {
        type: string;
        readonly sentences: ast.ReturnStatement[];
    };
    _call(kind: any, resumeLabel: any, name: any, argList: any): {
        type: any;
        readonly sentences: ast.ReturnStatement[];
    };
    _clone(childLabel: any, parentLabel: any): {
        type: string;
        readonly sentences: ast.ReturnStatement[];
    };
    _frame(resumeLabel: any, expression: any): {
        type: string;
        readonly sentences: ast.ReturnStatement[];
    };
    _debug(resumeLabel: any): {
        type: string;
        readonly sentences: ast.ReturnStatement[];
    };
    _return(expression: any): {
        type: string;
        readonly sentences: ast.ReturnStatement[];
    };
    _programCounterBranch(testAst: any, consequent: any, alternate?: any): ast.ExpressionStatement;
    _programCounterSet(label: any): ast.ExpressionStatement;
    _addSentence(ast: any): void;
}
declare class Label {
    private _proxifiedLabel;
    label: any;
    constructor(n?: any);
    proxy(anotherLabel: any): void;
    get sentences(): any[];
}
export { Context, Linearization, Scope };
