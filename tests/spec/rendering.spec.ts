import { expect } from "chai";
import { load, withDebugSession } from "./helpers";
import pixelmatch from "pixelmatch";

const loadPrg = (programName) => load(samplePath(programName));

function samplePath(name) {
  return `/base/tests/spec/samples/execution/${name}`;
}

function refImagePath(name) {
  return `/base/tests/spec/samples/reference-images/${name}`;
}

function match(
  referenceUrl: string,
  actualData: Uint8ClampedArray,
  threshold = 0.1,
): Promise<number> {
  return new Promise((fulfill) => {
    const diffCanvas = document.createElement("canvas");
    const referenceCanvas = document.createElement("canvas");
    const referenceImage = new Image();
    referenceImage.onload = compareCanvasData;
    referenceImage.src = referenceUrl;

    function compareCanvasData() {
      diffCanvas.style.imageRendering = "pixelated";
      diffCanvas.width = referenceImage.width;
      diffCanvas.height = referenceImage.height;
      const diffContext = diffCanvas.getContext(
        "2d",
      ) as CanvasRenderingContext2D;

      const diffData = diffContext.createImageData(
        referenceImage.width,
        referenceImage.height,
      );

      referenceCanvas.style.imageRendering = "pixelated";
      referenceCanvas.width = referenceImage.width;
      referenceCanvas.height = referenceImage.height;
      const referenceContext = referenceCanvas.getContext(
        "2d",
      ) as CanvasRenderingContext2D;

      referenceContext.drawImage(referenceImage, 0, 0);
      const referenceData = referenceContext.getImageData(
        0,
        0,
        referenceImage.width,
        referenceImage.height,
      );

      const count = pixelmatch(
        referenceData.data,
        actualData,
        diffData.data,
        referenceImage.width,
        referenceImage.height,
        { threshold },
      );

      diffContext.putImageData(diffData, 0, 0);
      document.body.appendChild(diffCanvas);
      fulfill(count);
    }
  });
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
        return new Promise(function (fulfill, reject) {
          program.onfinished = withDebugSession(function (session) {
            match(refImagePath("put_pixel.png"), session.framebuffer)
              .then(function (difference) {
                expect(difference).to.equal(0);
                fulfill(void 0);
              })
              .catch(reject);
          });
          program.start();
        });
      });
    });
  });

  describe("put_screen()", function () {
    it("centers a small map in a file in the screen", function () {
      return loadPrg("put_screen.prg").then(function (program) {
        return new Promise(function (fulfill, reject) {
          program.onfinished = withDebugSession(function (session) {
            match(refImagePath("put_screen.png"), session.framebuffer)
              .then(function (difference) {
                expect(difference).to.equal(0);
                fulfill(void 0);
              })
              .catch(reject);
          });
          program.start();
        });
      });
    });

    it("centers a big map in a file in the screen", function () {
      return loadPrg("put_screen_with_big_map.prg").then(function (program) {
        return new Promise(function (fulfill, reject) {
          program.onfinished = withDebugSession(function (session) {
            match(
              refImagePath("put_screen_with_big_map.png"),
              session.framebuffer,
            )
              .then(function (difference) {
                expect(difference).to.equal(0);
                fulfill(void 0);
              })
              .catch(reject);
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
