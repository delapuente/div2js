import { ProcessView } from "../../../memoryBrowser/mapper";
import { Component } from "../../../runtime/runtime";
import { Process } from "../../../runtime/scheduler";
import Palette from "./palette";
declare class ControlPoint {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
}
declare class DivMap {
    readonly code: number;
    readonly length: number;
    readonly description: string;
    readonly name: string | null;
    readonly width: number;
    readonly height: number;
    readonly center: ControlPoint;
    private readonly controlPoints;
    readonly data: Uint8Array;
    readonly palette: Palette;
    static fromWithinFpg(buffer: Uint8Array, palette: Palette): DivMap;
    static fromBuffer(buffer: Uint8Array): DivMap;
    constructor(code: number, length: number, description: string, name: string | null, width: number, height: number, center: ControlPoint, controlPoints: ControlPoint[], data: Uint8Array, palette: Palette);
    get controlPointCount(): number;
    get origin(): ControlPoint;
    controlPoint(index: number): ControlPoint;
    sample(x: number, y: number): number | null;
}
declare class MapDataComponent implements Component {
    readonly process: Process;
    private readonly _getMap;
    private readonly _processView;
    constructor(process: Process, _getMap: (fpgId: number, mapId: number) => DivMap, _processView: ProcessView);
    sample(x: number, y: number): number | null;
    get data(): Uint8Array;
    get file(): number;
    get graph(): number;
    get alphaBlend(): boolean;
}
export { ControlPoint, MapDataComponent };
export default DivMap;
