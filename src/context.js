
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

    getNextInstructionLabel: function () {
      return this._currentLinearization.getNextInstructionLabel();
    },

    newPlaceholderLabel: function () {
      return this._currentLinearization.newPlaceholderLabel();
    },

    verbatim: function (ast) {
      return this._currentLinearization.verbatim(ast);
    },

    goToIf: function (testAst, labelIfTrue, labelIfFalse) {
      return this._currentLinearization
        .goToIf(testAst, labelIfTrue, labelIfFalse);
    },

    goTo: function (label) {
      return this._currentLinearization.goTo(label);
    },
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
      var labels = this._extractLabels();
      var sentences = this._sentences;
      var currentCase = null;
      var label, consequent;

      // TODO: refactor
      // This is like a merge sort with preference on cases over instructions
      for (var i = 0, wrapper; (wrapper = sentences[i]); i++) {
        label = labels[0];
        if (i === label) {
          currentCase = t.concurrentLabel(label + 1);
          cases.push(currentCase);
          labels.shift();
        }
        consequent = currentCase.consequent;
        consequent.push.apply(consequent, wrapper.sentences);
      }
      return cases;
    },

    _extractLabels: function () {
      var set = Object.keys(this._labels.reduce(function (set, label) {
        if (typeof label.label === 'undefined') {
          throw new Error('Linearization impossible. Unresolved labels found.');
        }
        set[label.label] = true;
        return set;
      }, {}));
      return set.map(function (n) { return parseInt(n, 10); }).sort();
    },

    getNextInstructionLabel: function () {
      return new Label(this._pc + 1, this);
    },

    newPlaceholderLabel: function () {
      return new Label(undefined, this);
    },

    _addLabel: function (label) {
      this._labels.push(label);
    },

    verbatim: function (sentence) {
      this._addSentence(this._verbatim(sentence));
    },

    goToIf: function (testAst, labelIfTrue, labelIfFalse) {
      this._addSentence(this._goToIf(testAst, labelIfTrue, labelIfFalse));
      this._addLabel(labelIfTrue);
      this._addLabel(labelIfFalse);
    },

    goTo: function (label) {
      this._addSentence(this._goTo(label));
      this._addLabel(label);
    },

    _verbatim: function (sentence) {
      return {
        type: 'Verbatim',
        sentences: [sentence]
      };
    },

    _goToIf: function (testAst, labelIfTrue, labelIfFalse) {
      var _this = this;
      return {
        type: 'GoToIf',
        get sentences() {
          return [_this._programCounterBranch(
            testAst,
            labelIfTrue.label,
            labelIfFalse.label
          ), new ast.BreakStatement()];
        }
      };
    },

    _goTo: function (label) {
      var _this = this;
      return {
        type: 'GoTo',
        get sentences() {
          return [
            _this._programCounterSet(label.label),
            new ast.BreakStatement()
          ];
        }
      };
    },

    _programCounterBranch: function (testAst, consequent, alternate) {
      return new ast.ExpressionStatement(
        new ast.AssignmentExpression(
          t.programCounter,
          new ast.ConditionalExpression(
            testAst,
            new ast.Literal(consequent + 1),
            new ast.Literal(alternate + 1)
          )
        )
      );
    },

    _programCounterSet: function (label) {
      return new ast.ExpressionStatement(
        new ast.AssignmentExpression(
          t.programCounter,
          new ast.Literal(label + 1)
        )
      );
    },

    _addSentence: function (ast) {
      if (!this._sentences.length) {
        this._labels.push(new Label(0, this));
      }
      this._pc += 1;
      this._sentences.push(ast);
    }
  };

  function Label(n, linearization) {
    this.label = n;
    this._linearization = linearization;
  }

  Label.prototype.resolveToNextInstructionLabel = function () {
    this.label = this._linearization._pc + 1;
  };

  return {
    Context: Context,
    Linearization: Linearization
  };

});
