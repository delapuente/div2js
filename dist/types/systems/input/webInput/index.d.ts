import { Runtime, System } from "../../../runtime/runtime";
import { Div2InputSystem } from "../div2InputSystem";
export default class WebInputSystem implements Div2InputSystem, System {
    private readonly _canvas;
    private _mouseX;
    private _mouseY;
    private _left;
    private _right;
    private _middle;
    constructor(_canvas: HTMLCanvasElement);
    initialize(): void;
    private _onMouseMove;
    private _onMouseDown;
    private _onMouseUp;
    onStepStart(runtime: Runtime): void;
}
