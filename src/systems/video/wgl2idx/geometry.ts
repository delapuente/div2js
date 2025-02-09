import { ProcessView } from "../../../memoryBrowser/mapper";
import { Process } from "../../../runtime/scheduler";
import { Component } from "../../../runtime/runtime";
import DivMap from "./map";

type _NumberPairArray = [number, number];

class Dimensions extends Array<number> implements _NumberPairArray {
  0: number;
  1: number;
  length: 2;

  constructor(width: number, height: number) {
    super(width, height);
  }

  get width() {
    return this[0];
  }

  get height() {
    return this[1];
  }
}

class Point2D extends Array<number> implements _NumberPairArray {
  0: number;
  1: number;
  length: 2;

  constructor(x: number, y: number) {
    super(x, y);
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  translate(x: number, y: number): Point2D {
    return new Point2D(this.x + x, this.y + y);
  }

  rotate(angle: number): Point2D {
    return new Point2D(
      Math.round(Math.cos(angle) * this.x + Math.sin(angle) * this.y),
      Math.round(-Math.sin(angle) * this.x + Math.cos(angle) * this.y),
    );
  }

  scale(factor: number): Point2D {
    return new Point2D(
      Math.floor(this.x * factor),
      Math.floor(this.y * factor),
    );
  }

  flip([flipX, flipY]: [boolean, boolean], dimensions: Dimensions): Point2D {
    return new Point2D(
      flipX ? dimensions.width - this.x - 1 : this.x,
      flipY ? dimensions.height - this.y - 1 : this.y,
    );
  }
}

class GeometryComponent implements Component {
  constructor(
    public readonly process: Process,
    private readonly _getMap: (fpgId: number, mapId: number) => DivMap,
    private readonly _processView: ProcessView,
  ) {}

  private get _fpgId() {
    return this._processView.local("file").value;
  }

  private get _mapId() {
    return this._processView.local("graph").value;
  }

  get angle() {
    return this._processView.local("angle").value;
  }

  get boundingBox() {
    return new BoundingBox(
      this._processView.local("reserved.box_x0").value,
      this._processView.local("reserved.box_y0").value,
      this._processView.local("reserved.box_x1").value,
      this._processView.local("reserved.box_y1").value,
    );
  }

  set boundingBox(boundingBox: BoundingBox) {
    this._processView.local("reserved.box_x0").value = boundingBox.x0;
    this._processView.local("reserved.box_y0").value = boundingBox.y0;
    this._processView.local("reserved.box_x1").value = boundingBox.x1;
    this._processView.local("reserved.box_y1").value = boundingBox.y1;
  }

  get x() {
    return this._processView.local("x").value;
  }

  get y() {
    return this._processView.local("y").value;
  }

  get z() {
    return this._processView.local("z").value;
  }

  get originX() {
    return this._getMap(this._fpgId, this._mapId).origin.x;
  }

  get originY() {
    return this._getMap(this._fpgId, this._mapId).origin.y;
  }

  get width() {
    return this._getMap(this._fpgId, this._mapId).width;
  }

  get height() {
    return this._getMap(this._fpgId, this._mapId).height;
  }

  get flipX() {
    return !!(this._processView.local("flags").value & 1);
  }

  get flipY() {
    return !!(this._processView.local("flags").value & 2);
  }

  get size() {
    return this._processView.local("size").value;
  }

  mapCoordinates(x: number, y: number): [number, number] {
    const transform = GeometryData.fromGeometryComponent(this);
    return mapCoordinates(new Point2D(x, y), transform);
  }
}

class BoundingBox {
  constructor(
    readonly x0: number,
    readonly y0: number,
    readonly x1: number,
    readonly y1: number,
  ) {}

  getIntersection(other: BoundingBox): BoundingBox | null {
    // XXX: https://pbr-book.org/3ed-2018/Geometry_and_Transformations/Bounding_Boxes#:~:text=The%20intersection%20of%20two%20bounding,minimum%20of%20their%20maximum%20coordinates.
    const left = Math.max(
      Math.min(this.x0, this.x1),
      Math.min(other.x0, other.x1),
    );
    const top = Math.max(
      Math.min(this.y0, this.y1),
      Math.min(other.y0, other.y1),
    );
    const right = Math.min(
      Math.max(this.x0, this.x1),
      Math.max(other.x0, other.x1),
    );
    const bottom = Math.min(
      Math.max(this.y0, this.y1),
      Math.max(other.y0, other.y1),
    );

    return left < right && top < bottom
      ? new BoundingBox(left, top, right, bottom)
      : null;
  }
}

class GeometryData {
  constructor(
    readonly origin: Point2D,
    readonly dimensions: Dimensions,
    readonly position: Point2D,
    readonly rotation: number,
    readonly scaleFactor: number,
    readonly flip: [boolean, boolean],
  ) {}

  static fromGeometryComponent(geometry: GeometryComponent): GeometryData {
    return new GeometryData(
      new Point2D(geometry.originX, geometry.originY),
      new Dimensions(geometry.width, geometry.height),
      new Point2D(geometry.x, geometry.y),
      (geometry.angle * Math.PI) / 180000,
      geometry.size / 100,
      [geometry.flipX, geometry.flipY],
    );
  }
}

function screenCoordinates(
  spritePoint: Point2D,
  transform: GeometryData,
): Point2D {
  return spritePoint
    .flip(transform.flip, transform.dimensions)
    .translate(-transform.origin.x, -transform.origin.y)
    .scale(transform.scaleFactor)
    .rotate(transform.rotation)
    .translate(transform.position.x, transform.position.y);
}

function mapCoordinates(
  screenPoint: Point2D,
  transform: GeometryData,
): Point2D {
  return screenPoint
    .translate(-transform.position.x, -transform.position.y)
    .rotate(-transform.rotation)
    .scale(1 / transform.scaleFactor)
    .translate(transform.origin.x, transform.origin.y)
    .flip(transform.flip, transform.dimensions);
}

export {
  screenCoordinates,
  mapCoordinates,
  GeometryComponent,
  GeometryData,
  BoundingBox,
  Point2D,
  Dimensions,
};
