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

  get x() {
    return this._processView.local("x").value;
  }

  get y() {
    return this._processView.local("y").value;
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
    const { width, height, origin } = this._getMap(this._fpgId, this._mapId);
    return mapCoordinates(
      [x, y],
      [width, height],
      [this.flipX, this.flipY],
      [origin.x, origin.y],
      [this.x, this.y],
      this.angle,
      this.size,
    );
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

function screenCoordinates(
  spritePoint: [number, number],
  dimensions: [number, number],
  flip: [boolean, boolean],
  [offsetX, offsetY]: [number, number],
  position: [number, number],
  rotation: number,
  scale: number,
): [number, number] {
  return movedPoint(
    rotatedPoint(
      scaledPoint(
        movedPoint(flipCoordinates(spritePoint, dimensions, flip), [
          -offsetX,
          -offsetY,
        ]),
        scale,
      ),
      rotation,
    ),
    position,
  );
}

function mapCoordinates(
  screenPoint: [number, number],
  dimensions: [number, number],
  flip: [boolean, boolean],
  origin: [number, number],
  [positionX, positionY]: [number, number],
  rotation: number,
  scale: number,
): [number, number] {
  return flipCoordinates(
    movedPoint(
      scaledPoint(
        rotatedPoint(
          movedPoint(screenPoint, [-positionX, -positionY]),
          -rotation,
        ),
        1 / scale,
      ),
      origin,
    ),
    dimensions,
    flip,
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
};
