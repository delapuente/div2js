import { Runtime, System } from "../../../runtime/runtime";
import { Div2InputSystem } from "../div2InputSystem";

export default class WebInputSystem implements Div2InputSystem, System {
  private _mouseX: number = 0;
  private _mouseY: number = 0;
  private _left: boolean = false;
  private _right: boolean = false;
  private _middle: boolean = false;

  constructor(private readonly _canvas: HTMLCanvasElement) {}

  initialize() {
    // Listen to mouse move events.
    this._canvas.addEventListener("mousemove", (event) => {
      this._onMouseMove(event.offsetX, event.offsetY);
    });
    // Listen to mouse down events.
    this._canvas.addEventListener("mousedown", (event) => {
      this._onMouseDown(event.button);
    });
    // Listen to mouse up events.
    this._canvas.addEventListener("mouseup", (event) => {
      this._onMouseUp(event.button);
    });
  }

  private _onMouseMove(x: number, y: number) {
    this._mouseX = x;
    this._mouseY = y;
  }

  private _onMouseDown(button: number) {
    switch (button) {
      case 0:
        this._left = true;
        break;
      case 1:
        this._middle = true;
        break;
      case 2:
        this._right = true;
        break;
    }
  }

  private _onMouseUp(button: number) {
    switch (button) {
      case 0:
        this._left = false;
        break;
      case 1:
        this._middle = false;
        break;
      case 2:
        this._right = false;
        break;
    }
  }

  onStepStart(runtime: Runtime) {
    runtime.getMemoryBrowser().global("mouse.x").value = this._mouseX;
    runtime.getMemoryBrowser().global("mouse.y").value = this._mouseY;
    runtime.getMemoryBrowser().global("mouse.left").value = this._left ? 1 : 0;
    runtime.getMemoryBrowser().global("mouse.middle").value = this._middle
      ? 1
      : 0;
    runtime.getMemoryBrowser().global("mouse.right").value = this._right
      ? 1
      : 0;
  }
}
