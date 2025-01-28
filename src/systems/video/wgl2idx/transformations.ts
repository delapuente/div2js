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
};
