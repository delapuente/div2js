const fs = require('fs');
const path = require('path');
const esprima = require('esprima');

const srcDir = path.normalize(path.join(__dirname, '..', 'src'));

const wrapperContents = fs.readFileSync(
  path.join(srcDir, 'runtime', 'wrapper.js.in'),
  { encoding: 'utf8' }
);
const ast = esprima.parse(wrapperContents);
const wrapperJson = JSON.stringify(ast);
const compilerPath = path.join(srcDir, 'compiler.ts');
const compilerContents = fs.readFileSync(compilerPath, { encoding: 'utf8' });
fs.writeFileSync(compilerPath, compilerContents.replace(
  /let wrapperTemplate [^;]*;/,
  'let wrapperTemplate = ' + wrapperJson + ';'
));