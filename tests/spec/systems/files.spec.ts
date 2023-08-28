import { expect } from "chai";
import UrlFileSystem from "../../../src/systems/files/urlFiles";

describe("The URLFileSystem class", () => {
  let fileSystem: UrlFileSystem;

  beforeEach(() => {
    fileSystem = new UrlFileSystem({ rootUrl: "/base/demos" });
    fileSystem.initialize();
  });

  describe("loadPal()", () => {
    it("loads PAL files", (done) => {
      fileSystem.loadPal("DIV.PAL").then(() => done());
    });

    it("errors when loading something different than a PAL file", (done) => {
      fileSystem.loadPal("TEST.FPG").catch(() => done());
    });
  });

  describe("loadFpg()", () => {
    it("loads FPG files", (done) => {
      fileSystem.loadFpg("TEST.FPG").then(() => done());
    });

    it("errors when loading something different than a FPG file", (done) => {
      fileSystem.loadFpg("DIV.PAL").catch(() => done());
    });
  });

  describe("normalizePath()", () => {
    it("returns the same path when it contains a directory", () => {
      expect(fileSystem.normalizePath("PAL/DIV.PAL")).to.equal("PAL/DIV.PAL");
    });

    it("returns a path inside a default directory when there is no directory", () => {
      ["pal", "fpg"].forEach((extension) => {
        expect(fileSystem.normalizePath(`FILE.${extension}`)).to.equal(
          `${extension.toUpperCase()}/FILE.${extension}`
        );
      });
    });

    it("returns the same path when the extension is not recognized", () => {
      expect(fileSystem.normalizePath("DIV.UNKNOWN")).to.equal("DIV.UNKNOWN");
    });
  });
});
