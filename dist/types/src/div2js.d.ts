import parser from "./div2lang";
import * as loader from "./linker";
import * as translator from "./div2trans";
import * as compiler from "./compiler";
declare const compile: typeof compiler.compile;
declare const link: typeof loader.link;
declare function decodePrg(buffer: ArrayBuffer): string;
export { parser, translator, compile, link, link as load, // TODO: Remove, this is deprecated
decodePrg };
