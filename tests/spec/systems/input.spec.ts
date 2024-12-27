import { expect } from "chai";
import "sinon";
import WebInputSystem from "../../../src/systems/input/webInput";
import { RuntimeMock } from "../helpers";
import { Runtime } from "../../../src/runtime/runtime";

describe("The WebInputSystem class", () => {
  const CANVAS_WIDTH = 1280;
  const CANVAS_HEIGHT = 960;
  const RESOLUTION_WIDTH = CANVAS_WIDTH / 2;
  const RESOLUTION_HEIGHT = CANVAS_HEIGHT / 2;

  let canvas: HTMLCanvasElement;
  let runtime: Runtime;
  let webInput: WebInputSystem;

  beforeEach(() => {
    runtime = new RuntimeMock() as unknown as Runtime;
    canvas = window.document.createElement(
      "canvas",
    ) as unknown as HTMLCanvasElement;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    webInput = new WebInputSystem(RESOLUTION_WIDTH, RESOLUTION_HEIGHT, canvas);
    webInput.initialize();
  });

  it("registers the movement of the mouse according to the resolution", () => {
    const mouseMoveEvent = new window.MouseEvent("mousemove");
    // XXX: Firefox cannot derive offsetX and offsetY if the canvas is not
    // attached to the DOM, but the MouseEvent constructor does not allow
    // setting offsetX and offsetY directly. This way we can set the values
    // of offsetX and offsetY directly.
    Object.defineProperty(mouseMoveEvent, "offsetX", {
      value: CANVAS_WIDTH / 2,
    });
    Object.defineProperty(mouseMoveEvent, "offsetY", {
      value: CANVAS_HEIGHT / 2,
    });
    canvas.dispatchEvent(mouseMoveEvent);

    webInput.run(runtime);

    expect(runtime.getMemoryBrowser().global("mouse.x").value).to.equal(
      RESOLUTION_WIDTH / 2,
    );
    expect(runtime.getMemoryBrowser().global("mouse.y").value).to.equal(
      RESOLUTION_HEIGHT / 2,
    );
  });

  it("registers the left mouse button as pressed", () => {
    expect(runtime.getMemoryBrowser().global("mouse.left").value).to.equal(0);

    const mouseDownEvent = new window.MouseEvent("mousedown", {
      button: 0,
    });
    canvas.dispatchEvent(mouseDownEvent);
    webInput.run(runtime);

    expect(runtime.getMemoryBrowser().global("mouse.left").value).to.equal(1);
  });

  it("registers the middle mouse button as pressed", () => {
    expect(runtime.getMemoryBrowser().global("mouse.middle").value).to.equal(0);

    const mouseDownEvent = new window.MouseEvent("mousedown", {
      button: 1,
    });
    canvas.dispatchEvent(mouseDownEvent);
    webInput.run(runtime);

    expect(runtime.getMemoryBrowser().global("mouse.middle").value).to.equal(1);
  });

  it("registers the right mouse button as pressed", () => {
    expect(runtime.getMemoryBrowser().global("mouse.right").value).to.equal(0);

    const mouseDownEvent = new window.MouseEvent("mousedown", {
      button: 2,
    });
    canvas.dispatchEvent(mouseDownEvent);
    webInput.run(runtime);

    expect(runtime.getMemoryBrowser().global("mouse.right").value).to.equal(1);
  });

  it("registers the left mouse button as released, after being pressed", () => {
    const mouseDownEvent = new window.MouseEvent("mousedown", {
      button: 0,
    });
    canvas.dispatchEvent(mouseDownEvent);
    webInput.run(runtime);
    expect(runtime.getMemoryBrowser().global("mouse.left").value).to.equal(1);

    const mouseUpEvent = new window.MouseEvent("mouseup", {
      button: 0,
    });
    canvas.dispatchEvent(mouseUpEvent);
    webInput.run(runtime);

    expect(runtime.getMemoryBrowser().global("mouse.left").value).to.equal(0);
  });

  it("registers the middle mouse button as released, after being pressed", () => {
    const mouseDownEvent = new window.MouseEvent("mousedown", {
      button: 1,
    });
    canvas.dispatchEvent(mouseDownEvent);
    webInput.run(runtime);
    expect(runtime.getMemoryBrowser().global("mouse.middle").value).to.equal(1);

    const mouseUpEvent = new window.MouseEvent("mouseup", {
      button: 1,
    });
    canvas.dispatchEvent(mouseUpEvent);
    webInput.run(runtime);

    expect(runtime.getMemoryBrowser().global("mouse.middle").value).to.equal(0);
  });

  it("registers the right mouse button as released, after being pressed", () => {
    const mouseDownEvent = new window.MouseEvent("mousedown", {
      button: 2,
    });
    canvas.dispatchEvent(mouseDownEvent);
    webInput.run(runtime);
    expect(runtime.getMemoryBrowser().global("mouse.right").value).to.equal(1);

    const mouseUpEvent = new window.MouseEvent("mouseup", {
      button: 2,
    });
    canvas.dispatchEvent(mouseUpEvent);
    webInput.run(runtime);

    expect(runtime.getMemoryBrowser().global("mouse.right").value).to.equal(0);
  });
});
