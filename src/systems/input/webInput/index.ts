import { Runtime, System } from "../../../runtime/runtime";
import { Div2InputSystem } from "../div2InputSystem";

export default class WebInputSystem implements Div2InputSystem, System {
  private _mouseX: number = 0;
  private _mouseY: number = 0;

  constructor(
    private readonly _width: number,
    private readonly _height: number,
    private readonly _canvas: HTMLCanvasElement,
  ) {}

  initialize() {
    // Liste to mouse move events.
    this._canvas.addEventListener("mousemove", (event) => {
      this._onMouseMove(event.offsetX, event.offsetY);
    });
  }

  private _onMouseMove(x: number, y: number) {
    this._mouseX = Math.floor((x / this._canvas.width) * this._width);
    this._mouseY = Math.floor((y / this._canvas.height) * this._height);
  }

  run(runtime: Runtime) {
    runtime.getMemoryBrowser().global("mouse.x").value = this._mouseX;
    runtime.getMemoryBrowser().global("mouse.y").value = this._mouseY;
  }
}
