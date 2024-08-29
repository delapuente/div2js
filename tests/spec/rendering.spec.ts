import { expect } from "chai";
import { load, withDebugSession } from "./helpers";

const loadPrg = (programName) => load(samplePath(programName));

function samplePath(name) {
  return `/base/tests/spec/samples/execution/${name}`;
}

describe("Graphic functions", function () {
  describe("default video mode", function () {
    it("is m320x200", function () {
      return loadPrg("default-video-mode.prg").then(function (program) {
        return new Promise(function (fulfill) {
          program.onfinished = withDebugSession(function (session) {
            const screen = session.screen;
            expect(screen.width).to.equal(320);
            expect(screen.height).to.equal(200);
            expect(screen.buffer.length).to.equal(320 * 200);
            fulfill(void 0);
          });
          program.start();
        });
      });
    });
  });

  describe("put_pixel()", function () {
    it("sets a pixel to a given color", function () {
      return loadPrg("put_pixel.prg").then(function (program) {
        return new Promise(function (fulfill) {
          program.onfinished = withDebugSession(function (session) {
            const screen = session.screen;
            const pixelIndex = 99 * 320 + 159;
            expect(screen.buffer[pixelIndex]).to.equal(15);
            fulfill(void 0);
          });
          program.start();
        });
      });
    });
  });

  describe("put_screen()", function () {
    it("centers a small map in a file in the screen", function () {
      return loadPrg("put_screen.prg").then(function (program) {
        return new Promise(function (fulfill) {
          program.onfinished = withDebugSession(function (session) {
            const screen = session.screen;
            const testPattern = [
              [31, 0, 0, 31],
              [0, 15, 31, 0],
              [0, 31, 15, 0],
              [31, 0, 0, 31],
            ];
            for (let y = 0; y < 4; y++) {
              for (let x = 0; x < 4; x++) {
                // XXX: 158 and 98 are the offsets to center the 4x4 test map
                // in the 320x200 screen.
                const pixelIndex = (y + 98) * 320 + (x + 158);
                expect(screen.buffer[pixelIndex]).to.equal(
                  testPattern[y][x],
                  `Pixel at (${x}, ${y}) should be ${testPattern[y][x]}`,
                );
              }
            }
            fulfill(void 0);
          });
          program.start();
        });
      });
    });

    it("centers a big map in a file in the screen", function () {
      return loadPrg("put_screen_with_big_map.prg").then(function (program) {
        return new Promise(function (fulfill) {
          program.onfinished = withDebugSession(function (session) {
            const screen = session.screen;
            expect(screen.buffer[0 * 320 + 0]).to.equal(31);
            expect(screen.buffer[0 * 320 + 319]).to.equal(31);
            expect(screen.buffer[199 * 320 + 0]).to.equal(31);
            expect(screen.buffer[199 * 320 + 319]).to.equal(31);
            fulfill(void 0);
          });
          program.start();
        });
      });
    });
  });

  describe("load_pal()", function () {
    it("loads and set a palette", function () {
      return loadPrg("load_pal.prg").then(function (program) {
        return new Promise(function (fulfill) {
          program.onfinished = withDebugSession(function (session) {
            const program = session.process({
              index: 0,
              type: "_load_pal",
            });
            expect(program.private("palette_1").value).to.equal(1);
            expect(program.private("palette_2").value).to.equal(1);
            fulfill(void 0);
          });
          program.start();
        });
      });
    });

    it("errors when trying to load a non existent palette", function () {
      return loadPrg("load_pal_error.prg").then(function (program) {
        return new Promise(function (fulfill, reject) {
          program.onfinished = () =>
            reject(new Error("Should not have finished but errored, instead."));
          program.onerror = (error) => {
            expect(error.errorCode).to.equal(102);
            fulfill(void 0);
          };
          program.start();
        });
      });
    });
  });

  describe("load_fpg()", function () {
    it("loads a file", function () {
      return loadPrg("load_fpg.prg").then(function (program) {
        return new Promise(function (fulfill) {
          program.onfinished = withDebugSession(function (session) {
            const program = session.process({
              index: 0,
              type: "_load_fpg",
            });
            expect(program.private("fpg_1").value).to.equal(0);
            expect(program.private("fpg_2").value).to.equal(1);
            fulfill(void 0);
          });
          program.start();
        });
      });
    });

    it("errors when trying to load a non existent file", function () {
      return loadPrg("load_fpg_error.prg").then(function (program) {
        return new Promise(function (fulfill, reject) {
          program.onfinished = () =>
            reject(new Error("Should not have finished but errored, instead."));
          program.onerror = (error) => {
            expect(error.errorCode).to.equal(102);
            fulfill(void 0);
          };
          program.start();
        });
      });
    });

    it("errors when trying to use a non existent map", function () {
      return loadPrg("load_fpg_map_error.prg").then(function (program) {
        return new Promise(function (fulfill, reject) {
          program.onfinished = () =>
            reject(new Error("Should not have finished but errored, instead."));
          program.onerror = (error) => {
            expect(error.errorCode).to.equal(121);
            fulfill(void 0);
          };
          program.start();
        });
      });
    });
  });
});
