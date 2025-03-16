import parser from "./div2lang";
import * as loader from "./linker";
import * as translator from "./div2trans";
import * as compiler from "./compiler";
import { PRGFile } from "./prg";

parser.yy = parser.yy || {};
parser.yy.parseError = parser.parseError;

const compile = compiler.compile;
const link = loader.link;

function decodePrg(buffer: ArrayBuffer): string {
  return PRGFile.fromArrayBuffer(buffer).text;
}

export {
  parser,
  translator,
  compile,
  link,
  link as load, // TODO: Remove, this is deprecated
  decodePrg
};
