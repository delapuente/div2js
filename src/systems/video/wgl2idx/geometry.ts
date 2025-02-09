import { ProcessView } from "../../../memoryBrowser/mapper";
import { Process } from "../../../runtime/scheduler";
import { Component } from "../../../runtime/runtime";
import DivMap from "./map";

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
    return mapCoordinates([x, y], transform);
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
    readonly origin: [number, number],
    readonly dimensions: [number, number],
    readonly position: [number, number],
    readonly rotation: number,
    readonly scaleFactor: number,
    readonly flip: [boolean, boolean],
  ) {}

  static fromGeometryComponent(geometry: GeometryComponent): GeometryData {
    return new GeometryData(
      [geometry.originX, geometry.originY],
      [geometry.width, geometry.height],
      [geometry.x, geometry.y],
      (geometry.angle * Math.PI) / 180000,
      geometry.size / 100,
      [geometry.flipX, geometry.flipY],
    );
  }
}

function screenCoordinates(
  spritePoint: [number, number],
  transform: GeometryData,
): [number, number] {
  return movedPoint(
    rotatedPoint(
      scaledPoint(
        movedPoint(
          flipCoordinates(spritePoint, transform.dimensions, transform.flip),
          [-transform.origin[0], -transform.origin[1]],
        ),
        transform.scaleFactor,
      ),
      transform.rotation,
    ),
    transform.position,
  );
}

function mapCoordinates(
  screenPoint: [number, number],
  transform: GeometryData,
): [number, number] {
  return flipCoordinates(
    movedPoint(
      scaledPoint(
        rotatedPoint(
          movedPoint(screenPoint, [
            -transform.position[0],
            -transform.position[1],
          ]),
          -transform.rotation,
        ),
        1 / transform.scaleFactor,
      ),
      transform.origin,
    ),
    transform.dimensions,
    transform.flip,
  );
}

function rotatedPoint(
  [x, y]: [number, number],
  angle: number,
): [number, number] {
  return [
    Math.round(Math.cos(angle) * x + Math.sin(angle) * y),
    Math.round(-Math.sin(angle) * x + Math.cos(angle) * y),
  ];
}

function scaledPoint(
  [x, y]: [number, number],
  scaleFactor: number,
): [number, number] {
  return [Math.floor(x * scaleFactor), Math.floor(y * scaleFactor)];
}

function movedPoint(
  [xOrigin, yOrigin]: [number, number],
  [xDistance, yDistance]: [number, number],
): [number, number] {
  return [xOrigin + xDistance, yOrigin + yDistance];
}

function flipCoordinates(
  [x, y]: [number, number],
  [width, height]: [number, number],
  [isHorizontalFlip, isVerticalFlip]: [boolean, boolean],
): [number, number] {
  return [
    isHorizontalFlip ? width - x - 1 : x,
    isVerticalFlip ? height - y - 1 : y,
  ];
}

export {
  screenCoordinates,
  mapCoordinates,
  rotatedPoint,
  scaledPoint,
  movedPoint,
  flipCoordinates,
  GeometryComponent,
  GeometryData,
  BoundingBox,
};
