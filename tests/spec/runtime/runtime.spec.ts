import { expect } from "chai";
import { Runtime, System } from "../../../src/runtime/runtime";
import { SymbolTable } from "../../../src/memoryBrowser/symbols";
import { DIV_SYMBOLS } from "../../../src/memoryBrowser/definitions";
import { MemoryManager } from "../../../src/runtime/memory";

describe("The Runtime class", () => {
  let runtime: Runtime;

  beforeEach(() => {
    const memoryManager = new MemoryManager(new SymbolTable(DIV_SYMBOLS));
    runtime = new Runtime({}, memoryManager);
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
        Error
      );
    });
  });
});
