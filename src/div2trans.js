
define([], function () {
  'use strict';

  function BlockBuilder(level) {
    this._source = '';
    this._indentationLevel = level || 0;
  }

  BlockBuilder.prototype.indent = function (text) {
    var indentation = new Array(this._indentationLevel + 1).join('  ');
    return text
      .split('\n')
      .map(function (line) { return indentation + line; })
      .join('\n');
  };

  BlockBuilder.prototype.block = function (text) {
    this._source += this.indent(text) + '\n';
    this._indentationLevel++;
    return this;
  };

  BlockBuilder.prototype.end = function (text) {
    this._indentationLevel--;
    this._source += this.indent(text) + '\n';
    return this;
  };

  BlockBuilder.prototype.use = function (text) {
    text = text || '';
    var newLineTerminated = text[text.length - 1] === '\n';
    this._source += this.indent(text) + newLineTerminated ? '' : '\n';
    return this;
  };

  BlockBuilder.prototype.toString = function () {
    return this._source;
  };

  function newCoroutine(name, body) {
    return new BlockBuilder()
    .block('function ' + name + '(mem, exec, args) {')
      .block('while (true) {')
        .block('switch (exec.pc) {')
          .use(body)
        .end('}')
      .end('}')
    .end('}')
    .toString();
  }

  var programCounter = 1;
  var instructions = '';

  function startLinearization(instructions) {
    programCounter = 1;

  }

  var translators = Object.create(null);

  function translate(divAst) {
    if (!divAst || !divAst.type) { throw new Error('Invalid DIV2 AST'); }
    if (!(divAst.type in translators)) {
      throw new Error('Translation unavailable for ' + divAst.type + ' AST');
    }
    return translators[divAst.type].translate();
  }

  return {
    translate: translate
  };
});
