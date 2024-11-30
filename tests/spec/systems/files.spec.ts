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

  describe("defaultDirPath()", () => {
    it("returns a path inside a default directory", () => {
      ["pal", "fpg", "map"].forEach((extension) => {
        expect(fileSystem.defaultDirPath(`DIR/FILE.${extension}`)).to.equal(
          `${extension.toUpperCase()}/DIR/FILE.${extension}`,
        );
      });
    });

    it("returns the same path when the extension is not recognized", () => {
      expect(fileSystem.defaultDirPath("DIV.UNKNOWN")).to.equal("DIV.UNKNOWN");
    });
  });
});
