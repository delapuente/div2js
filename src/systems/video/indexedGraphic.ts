
class IndexedGraphic {

  buffer: Uint8Array;

  constructor (
    public width: number,
    public height: number
  ) {
    this.buffer = new Uint8Array(width * height);
  }

  putPixel (x: number, y: number, color: number) {
    this.buffer[y * this.width + x] = color;
  }
}

export default IndexedGraphic;