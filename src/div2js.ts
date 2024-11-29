import parser from "./div2lang";
import * as loader from "./loader";
import * as translator from "./div2trans";
import * as compiler from "./compiler";
import { PRGFile } from "./prg";

parser.yy = parser.yy || {};
parser.yy.parseError = parser.parseError;

const compile = compiler.compile;
const load = loader.load;

function decodePrg(buffer: ArrayBuffer): string {
  return PRGFile.fromArrayBuffer(buffer).text;
}

export { parser, translator, compile, load, decodePrg };
