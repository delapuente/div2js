import { expect } from "chai";
import { load, withDebugSession } from "./helpers";
import pixelmatch from "pixelmatch";

const loadPrg = (programName: string) => load(samplePath(programName));

function samplePath(name: string) {
  return `/base/tests/spec/samples/execution/${name}`;
}

function refImagePath(name: string) {
  return `/base/tests/spec/samples/reference-images/${name}`;
}

function match(
  referenceUrl: string,
  actualData: Uint8Array,
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

async function compare(programName: string, referenceImageName: string) {
  const program = await loadPrg(programName);
  return await new Promise(function (fulfill, reject) {
    program.onerror = reject;
    program.onfinished = withDebugSession(async (session) => {
      match(refImagePath(referenceImageName), session.framebuffer)
        .then(function (difference) {
          expect(difference).to.equal(0);
          fulfill(void 0);
        })
        .catch(reject);
    });
    program.start();
  });
}

describe("Graphic functions", function () {
  describe("default video mode", function () {
    it("is m320x200", function () {
      return loadPrg("default-video-mode.prg").then(function (program) {
        return new Promise(function (fulfill) {
          program.onfinished = withDebugSession(function (session) {
            const screen = session.screenData;
            expect(screen.width).to.equal(320);
            expect(screen.height).to.equal(200);
            expect(session.framebuffer.length).to.equal(320 * 200 * 4);
            fulfill(void 0);
          });
          program.start();
        });
      });
    });
  });

  describe("put_pixel()", function () {
    it("sets a pixel to a given color", function () {
      return compare("put_pixel.prg", "put_pixel.png");
    });
  });

  describe("put()", function () {
    it("places a sprite on the screen", function () {
      return compare("put.prg", "put.png");
    });
  });

  describe("xput()", function () {
    it("places a sprite on the screen", function () {
      return compare("xput.prg", "xput.png");
    });

    it("places a sprite on the screen (upscaled)", function () {
      return compare("xput_scale_up.prg", "xput_scale_up.png");
    });

    it("places a sprite on the screen (downscaled)", function () {
      return compare("xput_scale_down.prg", "xput_scale_down.png");
    });

    it("places a sprite on the screen (rotated clockwise)", function () {
      return compare("xput_rotate_cw.prg", "xput_rotate_cw.png");
    });

    it("places a sprite on the screen (rotated counter clockwise)", function () {
      return compare("xput_rotate_ccw.prg", "xput_rotate_ccw.png");
    });

    it("places a sprite on the screen (X-flipped)", function () {
      return compare("xput_flipx.prg", "xput_flipx.png");
    });

    it("places a sprite on the screen (Y-flipped)", function () {
      return compare("xput_flipy.prg", "xput_flipy.png");
    });

    it("places a sprite on the screen (XY-flipped)", function () {
      return compare("xput_flipxy.prg", "xput_flipxy.png");
    });

    it("places a sprite on the screen (transparent)", function () {
      return compare("xput_transparent.prg", "xput_transparent.png");
    });
  });

  describe("put_screen()", function () {
    it("centers a small map in a file in the screen", function () {
      return compare("put_screen.prg", "put_screen.png");
    });

    it("centers a big map in a file in the screen", function () {
      return compare(
        "put_screen_with_big_map.prg",
        "put_screen_with_big_map.png",
      );
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
