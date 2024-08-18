class IndexedGraphic {
  buffer: Uint8Array;

  constructor(
    public readonly width: number,
    public readonly height: number,
  ) {
    this.buffer = new Uint8Array(width * height);
  }

  // XXX: Captures the semantics of putting a pixel with some transformation regarding the color behind.
  blendPixel(x: number, y: number, color: number, transparentColor: number) {
    if (color !== transparentColor) {
      this.putPixel(x, y, color);
    }
  }

  putPixel(x: number, y: number, color: number) {
    this.buffer[y * this.width + x] = color;
  }

  putScreen(data: Uint8Array, width: number, height: number) {
    const { width: screenWidth, height: screenHeight } = this;
    const xOffset = Math.floor((screenWidth - width) / 2);
    const yOffset = Math.floor((screenHeight - height) / 2);
    const xStart = Math.max(0, xOffset);
    const yStart = Math.max(0, yOffset);
    const xEnd = Math.min(screenWidth, xOffset + width);
    const yEnd = Math.min(screenHeight, yOffset + height);
    for (let yScreen = yStart; yScreen < yEnd; yScreen += 1) {
      for (let xScreen = xStart; xScreen < xEnd; xScreen += 1) {
        const xBackground = xScreen - xOffset;
        const yBackground = yScreen - yOffset;
        const color = sample(data, width, xBackground, yBackground);
        this.putPixel(xScreen, yScreen, color);
      }
    }
  }

  xput(
    data: Uint8Array,
    width: number,
    height: number,
    xOrigin: number,
    yOrigin: number,
    x: number,
    y: number,
    angle: number,
    size: number,
    flags: number,
    region: number
  ) {
    // TODO: Flags: transparent.
    // TODO: Region.
    // Calculate transformation parameters.
    const rotation = angle * Math.PI / 180000;
    const scaleFactor = size / 100;
    const isHorizontalFlip = (flags & 1) !== 0;
    const isVerticalFlip = (flags & 2) !== 0;

    // Calculate the screen region to update.
    const [xTL, yTL] = movedPoint(
      rotatedPoint(
        scaledPoint(
          movedPoint([0, 0], [-xOrigin, -yOrigin]),
          scaleFactor
        ),
        rotation
      ),
      [x, y]
    );

    const [xTR, yTR] = movedPoint(
      rotatedPoint(
        scaledPoint(
          movedPoint([width, 0], [-xOrigin, -yOrigin]),
          scaleFactor
        ),
        rotation
      ),
      [x, y]
    );

    const [xBL, yBL] = movedPoint(
      rotatedPoint(
        scaledPoint(
          movedPoint([0, height], [-xOrigin, -yOrigin]),
          scaleFactor
        ),
        rotation
      ),
      [x, y]
    );

    const [xBR, yBR] = movedPoint(
      rotatedPoint(
        scaledPoint(
          movedPoint([width, height], [-xOrigin, -yOrigin]),
          scaleFactor
        ),
        rotation
      ),
      [x, y]
    );

    const { width: screenWidth, height: screenHeight } = this;
    const xStart = Math.max(0, Math.min(xTL, xTR, xBL, xBR));
    const yStart = Math.max(0, Math.min(yTL, yTR, yBL, yBR));
    const xEnd = Math.min(screenWidth, Math.max(xTL, xTR, xBL, xBR));
    const yEnd = Math.min(screenHeight, Math.max(yTL, yTR, yBL, yBR));

    // Update the region.
    for (let yScreen = yStart; yScreen < yEnd; yScreen += 1) {
      for (let xScreen = xStart; xScreen < xEnd; xScreen += 1) {
        const [xSprite, ySprite] = flipSpriteCoordinates(
          movedPoint(
            scaledPoint(
              rotatedPoint(
                movedPoint([xScreen, yScreen], [-x, -y]),
                -rotation
              ),
              1 / scaleFactor
            ),
            [xOrigin, yOrigin]
          ),
          width,
          height,
          isHorizontalFlip,
          isVerticalFlip
        );
        const maybeColor = sample(data, width, xSprite, ySprite);
        this.blendPixel(xScreen, yScreen, maybeColor ?? 0, 0);
      }
    }   
  }
}

function rotatedPoint([x, y]: [number, number], angle: number) : [number, number] {
  return [Math.round(Math.cos(angle) * x + Math.sin(angle) * y), Math.round(-Math.sin(angle) * x + Math.cos(angle) * y)];
}

function scaledPoint([x, y]: [number, number], scaleFactor: number) : [number, number] {
  return [Math.floor(x * scaleFactor), Math.floor(y * scaleFactor)];
}

function movedPoint([xOrigin, yOrigin]: [number, number], [xDistance, yDistance]: [number, number]) : [number, number] {
  return [xOrigin + xDistance, yOrigin + yDistance];
}

function flipSpriteCoordinates([x, y]: [number, number], width: number, height: number, isHorizontalFlip: boolean, isVerticalFlip: boolean) : [number, number] {
  return [isHorizontalFlip ? width - x - 1 : x, isVerticalFlip ? height - y - 1 : y];
}

function sample(data: Uint8Array, width: number, x: number, y: number) : number | null {
  // Invalid cases are signaled with null.
  let idx: number;
  if (x < 0 ||
      y < 0 ||
      width <= 0 ||
      x >= width ||
      (idx = y * width + x) < 0 || // XXX: Notice the assignment. Not proud of this but shorter.
      idx >= data.length) {
    return null;
  }
  return data[idx];
}

export default IndexedGraphic;
