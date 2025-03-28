import { expect } from "chai";
import { Runtime, System } from "../../../src/runtime/runtime";
import { SymbolTable } from "../../../src/memoryBrowser/symbols";
import { DIV_SYMBOLS } from "../../../src/memoryBrowser/definitions";
import { MemoryManager } from "../../../src/runtime/memory";
import {
  Baton,
  Process,
  ProcessStatus,
  Scheduler,
} from "../../../src/runtime/scheduler";

describe("The Runtime class", () => {
  let scheduler: Scheduler<Process>;
  let runtime: Runtime;

  beforeEach(() => {
    const memoryManager = new MemoryManager(new SymbolTable(DIV_SYMBOLS));
    scheduler = new Scheduler();
    runtime = new Runtime({}, memoryManager, scheduler);
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
      processId: 0,
      status: ProcessStatus.ALIVE,
      programIndex: 0,
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
