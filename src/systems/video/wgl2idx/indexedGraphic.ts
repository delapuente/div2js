class IndexedGraphic {
  buffer: Uint8Array;

  constructor(
    public readonly width: number,
    public readonly height: number,
  ) {
    this.buffer = new Uint8Array(width * height);
  }

  clear() {
    this.buffer.fill(0);
  }

  putPixel(x: number, y: number, color: number) {
    this.buffer[y * this.width + x] = color;
  }

  getPixel(x: number, y: number): number {
    return this.buffer[y * this.width + x];
  }
}

export default IndexedGraphic;
