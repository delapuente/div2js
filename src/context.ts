import * as ast from "./ast";
import t from "./templates";

class Context {
  private _processes: {};
  private _auxNames: {};
  private _currentProcess: any;
  private _symbolTable: any;
  private _mmap: any;
  private _currentLinearization: any;

  constructor(symbolTable, memoryMap) {
    this._processes = {};
    this._auxNames = {};
    this._currentProcess = undefined;
    this._symbolTable = symbolTable;
    this._mmap = memoryMap;
  }

  getMemoryMap() {
    return this._mmap;
  }

  startLinearization() {
    this._auxNames = {};
    this._currentLinearization = new Linearization();
  }

  getLinearizationCases() {
    return this._currentLinearization.getCases();
  }

  end() {
    return this._currentLinearization.end();
  }

  callFunction(resumeLabel, name, argList) {
    return this._currentLinearization.callFunction(resumeLabel, name, argList);
  }

  newProcess(resumeLabel, name, argList) {
    return this._currentLinearization.newProcess(resumeLabel, name, argList);
  }

  clone(childLabel, parentLabel) {
    return this._currentLinearization.clone(childLabel, parentLabel);
  }

  frame(resumeLabel, expression) {
    return this._currentLinearization.frame(resumeLabel, expression);
  }

  debug(resumeLabel) {
    return this._currentLinearization.debug(resumeLabel);
  }

  declareProcess(name) {
    this._processes[name] = true;
  }

  isProcess(name) {
    return name in this._processes;
  }

  enterProcess(name) {
    this._currentProcess = name;
  }

  exitProcess() {
    this._currentProcess = undefined;
  }

  return(expression) {
    return this._currentLinearization.return(expression);
  }

  newAux(name, initializer) {
    const nameCount = this._auxNames[name] || 0;
    const suffix = (this._auxNames[name] = nameCount + 1);
    if (nameCount > 0) {
      name += suffix;
    }
    const identifier = new ast.Identifier(name);
    const declaration = new ast.VariableDeclaration(
      new ast.VariableDeclarator(identifier, initializer),
    );
    return {
      identifier: identifier,
      declaration: declaration,
    };
  }

  newLabel() {
    return this._currentLinearization.newLabel();
  }

  label(label) {
    return this._currentLinearization.label(label);
  }

  verbatim(ast) {
    return this._currentLinearization.verbatim(ast);
  }

  goToIf(testAst, labelIfTrue, labelIfFalse) {
    return this._currentLinearization.goToIf(
      testAst,
      labelIfTrue,
      labelIfFalse,
    );
  }

  goTo(label) {
    return this._currentLinearization.goTo(label);
  }

  select(evaluation, options, defaultLabel) {
    return this._currentLinearization.select(evaluation, options, defaultLabel);
  }

  getScope(identifier) {
    let scope;
    const symbols = this._symbolTable;
    if (symbols.isGlobal(identifier)) {
      scope = "global";
    }
    // TODO: What about id? it is not a local but a special keyword with
    // identifier semantics to avoid assignation on it. Should be translated
    // as a local but identified like a special token and translated in a
    // special way.
    else if (symbols.isLocal(identifier)) {
      scope = "local";
    } else if (symbols.isPrivate(this._currentProcess, identifier)) {
      scope = "private";
    } else if (symbols.isConstant(identifier)) {
      scope = "constant";
    }
    return scope;
  }

  constantValue(identifier) {
    return this._symbolTable.constants.find(
      (constant) => constant.name === identifier,
    ).default;
  }
}

class Linearization {
  private _pc: number;
  private _sentences: any[];

  constructor() {
    this._pc = -1;
    this._sentences = [];
  }

  getCases() {
    const cases = [];
    const sentences = this._sentences;
    let currentCase = null;
    let caseIsFinished = false;
    let isReturn;
    let isLabel;
    let consequent;

    for (let i = 0, l = sentences.length; i < l; i++) {
      const wrapper = sentences[i];
      isLabel = wrapper instanceof Label;
      isReturn = wrapper.type === "Return";

      if (caseIsFinished && !isLabel) {
        continue;
      }

      if (isLabel) {
        currentCase = t.concurrentLabel(wrapper.label + 1);
        cases.push(currentCase);
      }
      consequent = currentCase.consequent;
      consequent.push(...wrapper.sentences);

      caseIsFinished = isReturn || (caseIsFinished && !isLabel);
    }
    return cases;
  }

  newLabel() {
    return new Label();
  }

  label(label) {
    const lastSentence = this._sentences[this._sentences.length - 1];
    if (lastSentence instanceof Label) {
      label.proxy(lastSentence);
    } else {
      label.label = this._pc + 1;
      this._sentences.push(label);
    }
  }

  verbatim(sentence) {
    this._addSentence(this._verbatim(sentence));
  }

  goToIf(testAst, labelIfTrue, labelIfFalse) {
    this._addSentence(this._goToIf(testAst, labelIfTrue, labelIfFalse));
  }

  goTo(label) {
    this._addSentence(this._goTo(label));
  }

  select(evaluation, options, defaultLabel) {
    this._addSentence(this._select(evaluation, options, defaultLabel));
  }

  end() {
    this._addSentence(this._end());
  }

  callFunction(resumeLabel, name, argList) {
    this._addSentence(this._call("function", resumeLabel, name, argList));
  }

  newProcess(resumeLabel, name, argList) {
    this._addSentence(this._call("process", resumeLabel, name, argList));
  }

  clone(childLabel, parentLabel) {
    this._addSentence(this._clone(childLabel, parentLabel));
  }

  frame(resumeLabel, expression) {
    this._addSentence(this._frame(resumeLabel, expression));
  }

  debug(resumeLabel) {
    this._addSentence(this._debug(resumeLabel));
  }

  return(expression) {
    this._addSentence(this._return(expression));
  }

  _verbatim(sentence) {
    return {
      type: "Verbatim",
      sentences: [sentence],
    };
  }

  _goToIf(testAst, labelIfTrue, labelIfFalse) {
    const _this = this;
    return {
      type: "GoToIf",
      get sentences() {
        return [
          _this._programCounterBranch(
            testAst,
            labelIfTrue.label,
            labelIfFalse.label,
          ),
          new ast.BreakStatement(),
        ];
      },
    };
  }

  _goTo(label) {
    const _this = this;
    return {
      type: "GoTo",
      get sentences() {
        return [
          _this._programCounterSet(label.label),
          new ast.BreakStatement(),
        ];
      },
    };
  }

  _select(evaluation, options, defaultLabel) {
    const _this = this;
    return {
      type: "Select",
      get sentences() {
        const defaultExpression = _this._programCounterSet(defaultLabel.label);
        const cases = options.map(function (option) {
          const tests = option.tests;
          return _this._programCounterBranch(
            t.some(evaluation, tests),
            option.label.label,
          );
        });
        return [defaultExpression as any]
          .concat(cases)
          .concat([new ast.BreakStatement()]);
      },
    };
  }

  _end() {
    return {
      type: "End",
      get sentences() {
        return [t.processEnd];
      },
    };
  }

  _call(kind, resumeLabel, name, argList) {
    const type = { function: "CallFunction", process: "NewProcess" }[kind];
    return {
      type: type,
      get sentences() {
        return [t.call(kind, resumeLabel.label + 1, name, argList)];
      },
    };
  }

  _clone(childLabel, parentLabel) {
    return {
      type: "Clone",
      get sentences() {
        return [t.processClone(childLabel.label + 1, parentLabel.label + 1)];
      },
    };
  }

  _frame(resumeLabel, expression) {
    return {
      type: "Frame",
      get sentences() {
        return [t.processFrame(resumeLabel.label + 1, expression)];
      },
    };
  }

  _debug(resumeLabel) {
    return {
      type: "Debug",
      get sentences() {
        return [t.processDebug(resumeLabel.label + 1)];
      },
    };
  }

  _return(expression) {
    return {
      type: "Return",
      get sentences() {
        return [t.processReturn(expression)];
      },
    };
  }

  _programCounterBranch(testAst, consequent, alternate?) {
    return new ast.ExpressionStatement(
      new ast.AssignmentExpression(
        t.programCounter,
        new ast.ConditionalExpression(
          testAst,
          new ast.Literal(consequent + 1),
          alternate ? new ast.Literal(alternate + 1) : t.programCounter,
        ),
      ),
    );
  }

  _programCounterSet(label) {
    return new ast.ExpressionStatement(
      new ast.AssignmentExpression(
        t.programCounter,
        new ast.Literal(label + 1),
      ),
    );
  }

  _addSentence(ast) {
    if (!this._sentences.length) {
      this._sentences.push(new Label(0));
    }
    this._sentences.push(ast);
    this._pc += 1;
  }
}

class Label {
  private _proxifiedLabel: any;
  label: any;

  constructor(n?) {
    this.label = n;
  }

  proxy(anotherLabel) {
    this._proxifiedLabel = anotherLabel;
    Object.defineProperty(this, "label", {
      get() {
        return this._proxifiedLabel.label;
      },
    });
  }

  get sentences() {
    return [];
  }
}

export { Context, Linearization };
