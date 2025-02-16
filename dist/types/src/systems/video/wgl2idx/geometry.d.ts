import { ProcessView } from "../../../memoryBrowser/mapper";
import { Process } from "../../../runtime/scheduler";
import { Component } from "../../../runtime/runtime";
import DivMap from "./map";
type _NumberPairArray = [number, number];
declare class Dimensions extends Array<number> implements _NumberPairArray {
    0: number;
    1: number;
    length: 2;
    constructor(width: number, height: number);
    get width(): number;
    get height(): number;
}
declare class Point2D extends Array<number> implements _NumberPairArray {
    0: number;
    1: number;
    length: 2;
    constructor(x: number, y: number);
    get x(): number;
    get y(): number;
    translate(x: number, y: number): Point2D;
    rotate(angle: number): Point2D;
    scale(factor: number): Point2D;
    flip([flipX, flipY]: [boolean, boolean], dimensions: Dimensions): Point2D;
}
declare class GeometryComponent implements Component {
    readonly process: Process;
    private readonly _getMap;
    private readonly _processView;
    constructor(process: Process, _getMap: (fpgId: number, mapId: number) => DivMap, _processView: ProcessView);
    private get _fpgId();
    private get _mapId();
    get angle(): number;
    get boundingBox(): BoundingBox;
    set boundingBox(boundingBox: BoundingBox);
    get x(): number;
    get y(): number;
    get z(): number;
    get originX(): number;
    get originY(): number;
    get width(): number;
    get height(): number;
    get flipX(): boolean;
    get flipY(): boolean;
    get size(): number;
    mapCoordinates(x: number, y: number): [number, number];
}
declare class BoundingBox {
    readonly x0: number;
    readonly y0: number;
    readonly x1: number;
    readonly y1: number;
    constructor(x0: number, y0: number, x1: number, y1: number);
    getIntersection(other: BoundingBox): BoundingBox | null;
}
declare class GeometryData {
    readonly origin: Point2D;
    readonly dimensions: Dimensions;
    readonly position: Point2D;
    readonly rotation: number;
    readonly scaleFactor: number;
    readonly flip: [boolean, boolean];
    constructor(origin: Point2D, dimensions: Dimensions, position: Point2D, rotation: number, scaleFactor: number, flip: [boolean, boolean]);
    static fromGeometryComponent(geometry: GeometryComponent): GeometryData;
}
declare function screenCoordinates(spritePoint: Point2D, transform: GeometryData): Point2D;
declare function mapCoordinates(screenPoint: Point2D, transform: GeometryData): Point2D;
export { screenCoordinates, mapCoordinates, GeometryComponent, GeometryData, BoundingBox, Point2D, Dimensions, };
