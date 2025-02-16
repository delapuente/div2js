import { Runtime, System } from "../../../runtime/runtime";
import { Div2InputSystem } from "../div2InputSystem";
export default class WebInputSystem implements Div2InputSystem, System {
    private readonly _width;
    private readonly _height;
    private readonly _canvas;
    private _mouseX;
    private _mouseY;
    private _left;
    private _right;
    private _middle;
    constructor(_width: number, _height: number, _canvas: HTMLCanvasElement);
    initialize(): void;
    private _onMouseMove;
    private _onMouseDown;
    private _onMouseUp;
    run(runtime: Runtime): void;
}
