import * as parser from './div2lang';
import * as loader from './loader';
import * as translator from './div2trans';
import * as compiler from './compiler';

parser.yy = parser.yy || {};
parser.yy.parseError = parser.parseError;

let compile = compiler.compile;
let load = loader.load;

export {
  parser,
  translator,
  compile,
  load
};