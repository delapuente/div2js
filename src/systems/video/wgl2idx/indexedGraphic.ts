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
    for (let y = yStart; y < yEnd; y += 1) {
      for (let x = xStart; x < xEnd; x += 1) {
        const color = data[(y - yOffset) * width + (x - xOffset)];
        this.putPixel(x, y, color);
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
    // Copy the data to the screen buffer at the point (x, y) with offset (centerX, centerY).
    const { width: screenWidth, height: screenHeight } = this;
    const xOffset = Math.floor(centerX - width / 2);
    const yOffset = Math.floor(centerY - height / 2);
    const xStart = Math.max(0, x);
    const yStart = Math.max(0, y);
    const xEnd = Math.min(screenWidth, x + width);
    const yEnd = Math.min(screenHeight, y + height);
    for (let y = yStart; y < yEnd; y += 1) {
      for (let x = xStart; x < xEnd; x += 1) {
        const color = data[(y - yOffset) * width + (x - xOffset)];
        this.putPixel(x, y, color);
      }
    }   
  }
}

export default IndexedGraphic;
