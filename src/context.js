
define(['ast', 'templates'], function (ast, t) {
  'use strict';

  function Context() {}

  Context.prototype = {
    constructor: Context,

    _auxNames: Object.create(null),

    startLinearization: function () {
      this._auxNames = Object.create(null);
      this._currentLinearization = new Linearization();
    },

    getLinearizationCases: function () {
      return this._currentLinearization.getCases();
    },

    end: function () {
      return this._currentLinearization.end();
    },

    newAux: function (name, initializer) {
      var nameCount = this._auxNames[name] || 0;
      var suffix = this._auxNames[name] = nameCount + 1;
      if (nameCount > 0) {
        name += suffix;
      }
      var identifier = new ast.Identifier(name);
      return new ast.VariableDeclaration(
        new ast.VariableDeclarator(identifier, initializer)
      );
    },

    newLabel: function () {
      return this._currentLinearization.newLabel();
    },

    label: function (label) {
      return this._currentLinearization.label(label);
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

    select: function (evaluation, options, defaultLabel) {
      return this._currentLinearization.select(
        evaluation,
        options,
        defaultLabel
      );
    }
  };

  function Linearization() {
    this._pc = -1;
    this._sentences = [];
  }

  Linearization.prototype = {
    constructor: Linearization,

    getCases: function () {
      var cases = [];
      var sentences = this._sentences;
      var currentCase = null;
      var consequent;

      for (var i = 0, wrapper; (wrapper = sentences[i]); i++) {
        if (wrapper instanceof Label) {
          currentCase = t.concurrentLabel(wrapper.label + 1);
          cases.push(currentCase);
        }
        consequent = currentCase.consequent;
        consequent.push.apply(consequent, wrapper.sentences);
      }
      return cases;
    },

    newLabel: function () {
      return new Label();
    },

    label: function (label) {
      var lastSentence = this._sentences[this._sentences.length - 1];
      if (lastSentence instanceof Label) {
        label.proxy(lastSentence);
      }
      else {
        label.label = this._pc + 1;
        this._sentences.push(label);
      }
    },

    verbatim: function (sentence) {
      this._addSentence(this._verbatim(sentence));
    },

    goToIf: function (testAst, labelIfTrue, labelIfFalse) {
      this._addSentence(this._goToIf(testAst, labelIfTrue, labelIfFalse));
    },

    goTo: function (label) {
      this._addSentence(this._goTo(label));
    },

    select: function (evaluation, options, defaultLabel) {
      this._addSentence(this._select(evaluation, options, defaultLabel));
    },

    end: function () {
      this._addSentence(this._end());
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

    _select: function (evaluation, options, defaultLabel) {
      var _this = this;
      return {
        type: 'Select',
        get sentences() {
          var defaultExpression = _this._programCounterSet(defaultLabel.label);
          var cases = options.map(function (option) {
            var tests = option.tests;
            return _this._programCounterBranch(
              t.some(evaluation, tests),
              option.label.label
            );
          });
          return [defaultExpression]
            .concat(cases)
            .concat([new ast.BreakStatement]);
        }
      };
    },

    _end: function () {
      return {
        type: 'End',
        get sentences() {
          // TODO: Maybe the endToken should be injected from div2trans.js
          return [new ast.ReturnStatement(t.endToken)];
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
            alternate ? new ast.Literal(alternate + 1) : t.programCounter
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
        this._sentences.push(new Label(0));
      }
      this._sentences.push(ast);
      this._pc += 1;
    }
  };

  function Label(n) { this.label = n; }

  Label.prototype = {
    constructor: Label,

    proxy: function (anotherLabel) {
      this._proxifiedLabel = anotherLabel;
      Object.defineProperty(this, 'label', { get: function () {
        return this._proxifiedLabel.label;
      }});
    },

    get sentences() {
      return [];
    }
  };

  return {
    Context: Context,
    Linearization: Linearization
  };

});
