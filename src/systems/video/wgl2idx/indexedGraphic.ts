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
        const color = sample(data, width, height, xBackground, yBackground);
        this.putPixel(xScreen, yScreen, color);
      }
    }
  }

  xput(
    data: Uint8Array,
    width: number,
    height: number,
    centerX: number,
    centerY: number,
    x: number,
    y: number,
    angle: number,
    size: number,
    flags: number,
    region: number
  ) {
    // TODO: Rotation.
    // TODO: Flags: transparent.
    // TODO: Region.
    const { width: screenWidth, height: screenHeight } = this;
    const scaleFactor = size / 100;
    const scaledWidth = Math.floor(width * scaleFactor);
    const scaledHeight = Math.floor(height * scaleFactor);
    const xOffset = x - Math.floor(centerX * scaleFactor);
    const yOffset = y - Math.floor(centerY * scaleFactor);
    const xStart = Math.max(0, xOffset);
    const yStart = Math.max(0, yOffset);
    const xEnd = Math.min(screenWidth, xOffset + scaledWidth);
    const yEnd = Math.min(screenHeight, yOffset + scaledHeight);
    const isHorizontalFlip = (flags & 1) !== 0;
    const isVerticalFlip = (flags & 2) !== 0;
    for (let yScreen = yStart; yScreen < yEnd; yScreen += 1) {
      for (let xScreen = xStart; xScreen < xEnd; xScreen += 1) {
        const xSprite = isHorizontalFlip ?
          Math.floor((scaledWidth - (xScreen - xOffset)) / scaleFactor) :
          Math.floor((xScreen - xOffset) / scaleFactor);
        const ySprite = isVerticalFlip ?
          Math.floor((scaledHeight - (yScreen - yOffset)) / scaleFactor) :
          Math.floor((yScreen - yOffset) / scaleFactor);
        const color = sample(data, width, height, xSprite, ySprite);
        this.blendPixel(xScreen, yScreen, color, 0);
      }
    }   
  }
}

function sample(data: Uint8Array, width: number, height: number, x: number, y: number) {
  return data[y * width + x];
}

export default IndexedGraphic;
