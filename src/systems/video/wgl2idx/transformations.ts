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

function boxIntersection(
  [leftA, topA, rightA, bottomA]: [number, number, number, number],
  [leftB, topB, rightB, bottomB]: [number, number, number, number],
): [number, number, number, number] | null {
  // XXX: https://pbr-book.org/3ed-2018/Geometry_and_Transformations/Bounding_Boxes#:~:text=The%20intersection%20of%20two%20bounding,minimum%20of%20their%20maximum%20coordinates.
  const left = Math.max(Math.min(leftA, rightA), Math.min(leftB, rightB));
  const top = Math.max(Math.min(topA, bottomA), Math.min(topB, bottomB));
  const right = Math.min(Math.max(leftA, rightA), Math.max(leftB, rightB));
  const bottom = Math.min(Math.max(topA, bottomA), Math.max(topB, bottomB));

  return left < right && top < bottom ? [left, top, right, bottom] : null;
}

export {
  screenCoordinates,
  spriteCoordinates,
  rotatedPoint,
  scaledPoint,
  movedPoint,
  flipSpriteCoordinates,
  boxIntersection,
};
