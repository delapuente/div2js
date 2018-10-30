
import * as ast from './ast';
import t from './templates';

function Context (ctx?) {
  this._processes = {};
  this._auxNames = {};
  this._currentProcess = undefined;

  for (let key in ctx) {
    if (ctx.hasOwnProperty(key)) {
      this[key] = ctx[key];
    }
  }
}

Context.prototype = {
  constructor: Context,

  setMemoryMap: function (mmap) {
    this._mmap = mmap;
  },

  getMemoryMap: function () {
    return this._mmap;
  },

  startLinearization: function () {
    this._auxNames = {};
    this._currentLinearization = new Linearization();
  },

  getLinearizationCases: function () {
    return this._currentLinearization.getCases();
  },

  end: function () {
    return this._currentLinearization.end();
  },

  callFunction: function (resumeLabel, name, argList) {
    return this._currentLinearization
      .callFunction(resumeLabel, name, argList);
  },

  newProcess: function (resumeLabel, name, argList) {
    return this._currentLinearization
      .newProcess(resumeLabel, name, argList);
  },

  clone: function (childLabel, parentLabel) {
    return this._currentLinearization.clone(childLabel, parentLabel);
  },

  frame: function (resumeLabel, expression) {
    return this._currentLinearization.frame(resumeLabel, expression);
  },

  debug: function (resumeLabel) {
    return this._currentLinearization.debug(resumeLabel);
  },

  declareProcess: function (name) {
    this._processes[name] = true;
  },

  isProcess: function (name) {
    return name in this._processes;
  },

  enterProcess: function (name) {
    this._currentProcess = name;
  },

  exitProcess: function () {
    this._currentProcess = undefined;
  },

  return: function (expression) {
    return this._currentLinearization.return(expression);
  },

  newAux: function (name, initializer) {
    let nameCount = this._auxNames[name] || 0;
    let suffix = this._auxNames[name] = nameCount + 1;
    if (nameCount > 0) {
      name += suffix;
    }
    let identifier = new ast.Identifier(name);
    let declaration = new ast.VariableDeclaration(
      new ast.VariableDeclarator(identifier, initializer)
    );
    return {
      identifier: identifier,
      declaration: declaration
    };
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
  },

  getScope: function (identifier) {
    let scope;
    let symbols = this._mmap.symbols;
    if (symbols.isGlobal(identifier)) {
      scope = 'global';
    }
    // TODO: What about id? it is not a local but a special keyword with
    // identifier semantics to avoid assignation on it. Should be translated
    // as a local but identified like a special token and translated in a
    // special way.
    else if (symbols.isLocal(identifier)) {
      scope = 'local';
    }
    else if (symbols.isPrivate(this._currentProcess, identifier)) {
      scope = 'private';
    }
    return scope;
  }
};

function Linearization () {
  this._pc = -1;
  this._sentences = [];
}

Linearization.prototype = {
  constructor: Linearization,

  getCases: function () {
    let cases = [];
    let sentences = this._sentences;
    let currentCase = null;
    let caseIsFinished = false;
    let isReturn;
    let isLabel;
    let consequent;

    for (let i = 0, l = sentences.length; i < l; i++) {
      let wrapper = sentences[i];
      isLabel = wrapper instanceof Label;
      isReturn = wrapper.type === 'Return';

      if (caseIsFinished && !isLabel) { continue; }

      if (isLabel) {
        currentCase = t.concurrentLabel(wrapper.label + 1);
        cases.push(currentCase);
      }
      consequent = currentCase.consequent;
      consequent.push.apply(consequent, wrapper.sentences);

      caseIsFinished = isReturn || (caseIsFinished && !isLabel);
    }
    return cases;
  },

  newLabel: function () {
    return new Label();
  },

  label: function (label) {
    let lastSentence = this._sentences[this._sentences.length - 1];
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

  callFunction: function (resumeLabel, name, argList) {
    this._addSentence(this._call('function', resumeLabel, name, argList));
  },

  newProcess: function (resumeLabel, name, argList) {
    this._addSentence(this._call('process', resumeLabel, name, argList));
  },

  clone: function (childLabel, parentLabel) {
    this._addSentence(this._clone(childLabel, parentLabel));
  },

  frame: function (resumeLabel, expression) {
    this._addSentence(this._frame(resumeLabel, expression));
  },

  debug: function (resumeLabel) {
    this._addSentence(this._debug(resumeLabel));
  },

  return: function (expression) {
    this._addSentence(this._return(expression));
  },

  _verbatim: function (sentence) {
    return {
      type: 'Verbatim',
      sentences: [sentence]
    };
  },

  _goToIf: function (testAst, labelIfTrue, labelIfFalse) {
    let _this = this;
    return {
      type: 'GoToIf',
      get sentences () {
        return [_this._programCounterBranch(
          testAst,
          labelIfTrue.label,
          labelIfFalse.label
        ), new ast.BreakStatement()];
      }
    };
  },

  _goTo: function (label) {
    let _this = this;
    return {
      type: 'GoTo',
      get sentences () {
        return [
          _this._programCounterSet(label.label),
          new ast.BreakStatement()
        ];
      }
    };
  },

  _select: function (evaluation, options, defaultLabel) {
    let _this = this;
    return {
      type: 'Select',
      get sentences () {
        let defaultExpression = _this._programCounterSet(defaultLabel.label);
        let cases = options.map(function (option) {
          let tests = option.tests;
          return _this._programCounterBranch(
            t.some(evaluation, tests),
            option.label.label
          );
        });
        return [defaultExpression]
          .concat(cases)
          .concat([new ast.BreakStatement()]);
      }
    };
  },

  _end: function () {
    return {
      type: 'End',
      get sentences () {
        return [t.processEnd];
      }
    };
  },

  _call: function (kind, resumeLabel, name, argList) {
    let type = { 'function': 'CallFunction', 'process': 'NewProcess' }[kind];
    return {
      type: type,
      get sentences () {
        return [t.call(kind, resumeLabel.label + 1, name, argList)];
      }
    };
  },

  _clone: function (childLabel, parentLabel) {
    return {
      type: 'Clone',
      get sentences () {
        return [t.processClone(childLabel.label + 1, parentLabel.label + 1)];
      }
    };
  },

  _frame: function (resumeLabel, expression) {
    return {
      type: 'Frame',
      get sentences () {
        return [t.processFrame(resumeLabel.label + 1, expression)];
      }
    };
  },

  _debug: function (resumeLabel) {
    return {
      type: 'Debug',
      get sentences () {
        return [t.processDebug(resumeLabel.label + 1)];
      }
    };
  },

  _return: function (expression) {
    return {
      type: 'Return',
      get sentences () {
        return [t.processReturn(expression)];
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

function Label (n?) { this.label = n; }

Label.prototype = {
  constructor: Label,

  proxy: function (anotherLabel) {
    this._proxifiedLabel = anotherLabel;
    Object.defineProperty(this, 'label', { get: function () {
      return this._proxifiedLabel.label;
    }});
  },

  get sentences () {
    return [];
  }
};

export {
  Context,
  Linearization
};
