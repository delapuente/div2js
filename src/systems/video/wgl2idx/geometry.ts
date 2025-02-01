import { ProcessView } from "../../../memoryBrowser/mapper";
import { Process } from "../../../runtime/scheduler";
import { Component } from "../../../runtime/runtime";

class GeometryComponent implements Component {
  constructor(
    public readonly process: Process,
    private readonly _processView: ProcessView,
  ) {}

  get boundingBox() {
    return new BoundingBox(
      this._processView.local("reserved.box_x0").value,
      this._processView.local("reserved.box_y0").value,
      this._processView.local("reserved.box_x1").value,
      this._processView.local("reserved.box_y1").value,
    );
  }
}

class BoundingBox {
  constructor(
    private readonly _x0: number,
    private readonly _y0: number,
    private readonly _x1: number,
    private readonly _y1: number,
  ) {}

  getIntersection(other: BoundingBox): BoundingBox | null {
    // XXX: https://pbr-book.org/3ed-2018/Geometry_and_Transformations/Bounding_Boxes#:~:text=The%20intersection%20of%20two%20bounding,minimum%20of%20their%20maximum%20coordinates.
    const left = Math.max(
      Math.min(this._x0, this._x1),
      Math.min(other._x0, other._x1),
    );
    const top = Math.max(
      Math.min(this._y0, this._y1),
      Math.min(other._y0, other._y1),
    );
    const right = Math.min(
      Math.max(this._x0, this._x1),
      Math.max(other._x0, other._x1),
    );
    const bottom = Math.min(
      Math.max(this._y0, this._y1),
      Math.max(other._y0, other._y1),
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
        movedPoint(flipSpriteCoordinates(spritePoint, dimensions, flip), [
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

function spriteCoordinates(
  screenPoint: [number, number],
  dimensions: [number, number],
  flip: [boolean, boolean],
  origin: [number, number],
  [positionX, positionY]: [number, number],
  rotation: number,
  scale: number,
): [number, number] {
  return flipSpriteCoordinates(
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

function flipSpriteCoordinates(
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
  spriteCoordinates,
  rotatedPoint,
  scaledPoint,
  movedPoint,
  flipSpriteCoordinates,
  GeometryComponent,
};
