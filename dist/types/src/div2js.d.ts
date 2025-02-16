import parser from "./div2lang";
import * as loader from "./loader";
import * as translator from "./div2trans";
import * as compiler from "./compiler";
declare const compile: typeof compiler.compile;
declare const load: typeof loader.load;
declare function decodePrg(buffer: ArrayBuffer): string;
export { parser, translator, compile, load, decodePrg };
