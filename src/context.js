
define(['ast', 'templates'], function (ast, t) {
  'use strict';

  function Context() {}

  Context.prototype = {
    constructor: Context,

    startLinearization: function () {
      this._currentLinearization = new Linearization();
    },

    getLinearizationCases: function () {
      return this._currentLinearization.getCases();
    },

    verbatim: function (ast) {
      return this._currentLinearization.verbatim(ast);
    }
  };

  function Linearization() {
    this._pc = -1;
    this._labels = [];
    this._sentences = [];
  }

  Linearization.prototype = {
    constructor: Linearization,

    getCases: function () {
      var cases = [];
      var sentences = this._sentences;
      var currentCase = null;

      // This is like a merge sort with preference on cases over instructions
      for (var i = 0, sentence; sentence = sentences[i]; i++) {
        if (i === this._labels[0]) {

          // End current case
          if (currentCase) {
            currentCase.sentences.push(new ast.BreakStatement());
          }

          currentCase = t.concurrentLabel(i + 1);
          cases.push(currentCase);

          this._labels.shift();
        }
        currentCase.consequent.push(sentence);
      }
      return cases;
    },

    verbatim: function (ast) {
      this._addSentence(ast);
    },

    _addSentence: function (ast) {
      if (!this._sentences.length) {
        this._labels.push(0);
        this._nextLabel = 0;
      }
      this._pc += 1;
      this._sentences.push(ast);
    }
  };

  return {
    Context: Context,
    Linearization: Linearization
  };

});
