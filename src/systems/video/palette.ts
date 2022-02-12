
class Palette {

  size: number

  static fromBuffer (buffer: Uint8Array): Palette {
    const palette = new Palette(buffer);
    return palette;
  }

  static withSize (size: number): Palette {
    const buffer = new Uint8Array(size * 3)
    return new Palette(buffer);
  }

  constructor (public buffer: Uint8Array) {
    // TODO: validate buffer size
    this.size = buffer.length / 3;
  }

  setColor (index, r, g, b) {
    this.buffer[index * 3] = r;
    this.buffer[index * 3 + 1] = g;
    this.buffer[index * 3 + 2] = b;
  }
}

export default Palette;