// To allow chai-like expressions, supressing the unused expressions error.
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect } from "chai";
import { load } from "./helpers";
import { NameIsNotNewError } from "../../src/div2checker";

const loadPrg = (programName) => load(samplePath(programName));

function samplePath(name) {
  return "/base/tests/spec/samples/semantics/" + name;
}

describe("Declaration of new names", function () {
  it("Raises when reusing the name of the main program in a process", function () {
    return loadPrg("reuse-program-name-in-process.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("main_program");
        expect(error.scope).to.equal("global");
        expect(error.process).to.equal("main_program");
      });
  });

  it("Raises when reusing the name of the main program in the GLOBAL section", function () {
    return loadPrg("reuse-program-name-in-global.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("main_program");
        expect(error.scope).to.equal("global");
        expect(error.process).to.be.undefined;
      });
  });

  it("Raises when reusing the name of the main program in the LOCAL section", function () {
    return loadPrg("reuse-program-name-in-local.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("main_program");
        expect(error.scope).to.equal("local");
        expect(error.process).to.be.undefined;
      });
  });

  it("Raises when reusing the name of the main program in a PRIVATE section", function () {
    return loadPrg("reuse-program-name-in-private.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("main_program");
        expect(error.scope).to.equal("private");
        expect(error.process).to.equal("main_program");
      });
  });

  it("Raises when reusing the name of a process in another process", function () {
    return loadPrg("reuse-process-name-in-process.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("one_process");
        expect(error.scope).to.equal("global");
      });
  });

  it("Raises when reusing the name of a process in a PRIVATE section", function () {
    return loadPrg("reuse-process-name-in-private.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("one_process");
        expect(error.scope).to.equal("private");
        expect(error.process).to.equal("another_process");
      });
  });

  it("Raises when reusing the name of a global again in the GLOBAL section", function () {
    return loadPrg("reuse-global-name-in-global.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("one_variable");
        expect(error.scope).to.equal("global");
      });
  });

  it("Raises when reusing the name of a global in the LOCAL section", function () {
    return loadPrg("reuse-global-name-in-local.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("one_variable");
        expect(error.scope).to.equal("local");
      });
  });

  it("Raises when reusing the name of a global in a PRIVATE section", function () {
    return loadPrg("reuse-global-name-in-private.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("one_variable");
        expect(error.scope).to.equal("private");
      });
  });

  it("Raises when reusing the name of a global in a process", function () {
    return loadPrg("reuse-global-name-in-process.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("one_variable");
        expect(error.scope).to.equal("global");
        expect(error.process).to.equal("one_variable");
      });
  });

  it("Raises when reusing the name of a local again in the LOCAL section", function () {
    return loadPrg("reuse-local-name-in-local.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("one_variable");
        expect(error.scope).to.equal("local");
      });
  });

  it("Raises when reusing the name of a local in a PRIVATE section", function () {
    return loadPrg("reuse-local-name-in-private.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("one_variable");
        expect(error.scope).to.equal("private");
        expect(error.process).to.equal("one_process");
      });
  });

  it("Raises when reusing the name of a local in a process", function () {
    return loadPrg("reuse-local-name-in-process.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("one_variable");
        expect(error.scope).to.equal("global");
        expect(error.process).to.equal("one_variable");
      });
  });

  it("Raises when reusing the name of a private in the same PRIVATE section", function () {
    return loadPrg("reuse-private-name-in-same-private.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("one_private");
        expect(error.scope).to.equal("private");
        expect(error.process).to.equal("one_process");
      });
  });

  it("Raises when reusing the name of a private in another PRIVATE section", function () {
    return loadPrg("reuse-private-name-in-other-private.prg");
  });

  it("Raises when reusing the name of a private in a process", function () {
    return loadPrg("reuse-private-name-in-process.prg")
      .then(function () {
        throw new Error("The program should fail while checking semantics.");
      })
      .catch((error) => {
        expect(error).to.be.an.instanceOf(NameIsNotNewError);
        expect(error.name).to.equal("private_name");
        expect(error.scope).to.equal("global");
        expect(error.process).to.equal("private_name");
      });
  });
});
