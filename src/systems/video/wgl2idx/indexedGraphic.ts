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
        const color = data[(yScreen - yOffset) * width + (xScreen - xOffset)];
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
    // TODO: Flags: flip.
    // TODO: Flags: transparent.
    // TODO: Flags: mirror.
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
    for (let yScreen = yStart; yScreen < yEnd; yScreen += 1) {
      for (let xScreen = xStart; xScreen < xEnd; xScreen += 1) {
        const color = data[Math.floor((yScreen - yOffset) / scaleFactor) * width + Math.floor((xScreen - xOffset) / scaleFactor)];
        this.blendPixel(xScreen, yScreen, color, 0);        
      }
    }   
  }
}

export default IndexedGraphic;
