import parser from "./div2lang";
import * as loader from "./loader";
import * as translator from "./div2trans";
import * as compiler from "./compiler";

parser.yy = parser.yy || {};
parser.yy.parseError = parser.parseError;

const compile = compiler.compile;
const load = loader.load;

export { parser, translator, compile, load };
