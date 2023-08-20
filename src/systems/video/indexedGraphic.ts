class IndexedGraphic {
  buffer: Uint8Array;

  constructor(public readonly width: number, public readonly height: number) {
    this.buffer = new Uint8Array(width * height);
  }

  putPixel(x: number, y: number, color: number) {
    this.buffer[y * this.width + x] = color;
  }

  putScreen(data: Uint8Array, width: number, height: number) {
    const xOffset = Math.floor((this.width - width) / 2);
    const yOffset = Math.floor((this.height - height) / 2);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const color = data[y * width + x];
        // XXX: Inlined putPixel() for performance.
        this.buffer[(yOffset + y) * this.width + xOffset + x] = color;
      }
    }
  }
}

export default IndexedGraphic;
