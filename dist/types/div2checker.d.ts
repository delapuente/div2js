import * as ctx from "./context";
import { SymbolTable } from "./memoryBrowser/symbols";
declare class NameIsNotNewError extends Error {
    readonly name: string;
    readonly scope: ctx.Scope;
    readonly process?: string;
    constructor(name: string, scope: ctx.Scope, process?: string);
}
declare function extractContext(div2ast: any, symbolTable: SymbolTable): ctx.Context;
export { extractContext, NameIsNotNewError };
