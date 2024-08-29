import { expect } from "chai";
import { Runtime, System } from "../../../src/runtime/runtime";
import { SymbolTable } from "../../../src/memoryBrowser/symbols";
import { DIV_SYMBOLS } from "../../../src/memoryBrowser/definitions";
import { MemoryManager } from "../../../src/runtime/memory";
import { Baton, Process, Scheduler } from "../../../src/runtime/scheduler";

describe("The Runtime class", () => {
  let scheduler: Scheduler<Process>;
  let runtime: Runtime;

  beforeEach(() => {
    const memoryManager = new MemoryManager(new SymbolTable(DIV_SYMBOLS));
    scheduler = new Scheduler();
    runtime = new Runtime({}, memoryManager, scheduler);
  });

  describe("registerSystem()", () => {
    const fakeSystem: System = {
      initialize() {
        void 0;
      },
    };

    it("raises when registering a system twice under the same name", () => {
      runtime.registerSystem(fakeSystem, "test");
      expect(() => runtime.registerSystem(fakeSystem, "test")).to.throw(Error);
    });
  });

  describe("registerFunction()", () => {
    it("raises when registering a function twice under the same name", () => {
      runtime.registerFunction(() => void 0, "test");
      expect(() => runtime.registerFunction(() => void 0, "test")).to.throw(
        Error,
      );
    });
  });

  describe("Callback hooks", () => {
    describe("onfinished", () => {
      it("can be retrieved", () => {
        const callback = () => void 0;
        runtime.onfinished = callback;
        expect(runtime.onfinished).to.equal(callback);
      });
    });
  });

  describe("call()", () => {
    const fakeProcess: Process = {
      id: 0,
      dead: false,
      pc: 0,
      run(): Baton {
        return new Baton("frame");
      },
    };

    const erroredFunction = () => {
      throw new Error("This function failed with a JavaScript error.");
    };

    it("raises when calling a function that does not exist", () => {
      expect(() => runtime.call("non_existent", [], fakeProcess)).to.throw(
        Error,
      );
    });

    it("raises when calling a function that throws a JavaScript error", () => {
      runtime.registerFunction(erroredFunction, "errored");
      expect(() => runtime.call("errored", [], fakeProcess)).to.throw(Error);
    });
  });
});
