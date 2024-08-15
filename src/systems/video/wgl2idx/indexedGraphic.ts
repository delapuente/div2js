class IndexedGraphic {
  buffer: Uint8Array;

  constructor(
    public readonly width: number,
    public readonly height: number,
  ) {
    this.buffer = new Uint8Array(width * height);
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
    // TODO: Scaling.
    // TODO: Flags: flip.
    // TODO: Flags: transparent.
    // TODO: Flags: mirror.
    // TODO: Region.
    const { width: screenWidth, height: screenHeight } = this;
    const xOffset = x - centerX;
    const yOffset = y - centerY;
    const xStart = Math.max(0, xOffset);
    const yStart = Math.max(0, yOffset);
    const xEnd = Math.min(screenWidth, xOffset + width);
    const yEnd = Math.min(screenHeight, yOffset + height);
    for (let yScreen = yStart; yScreen < yEnd; yScreen += 1) {
      for (let xScreen = xStart; xScreen < xEnd; xScreen += 1) {
        const color = data[(yScreen - yOffset) * width + (xScreen - xOffset)];
        if (color !== 0) {
          this.putPixel(xScreen, yScreen, color);
        }
      }
    }   
  }
}

export default IndexedGraphic;
