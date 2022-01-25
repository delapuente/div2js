
class Palette {
  buffer: Uint8Array;

  constructor (public size) {
    this.buffer = new Uint8Array(size * 3);
  }

  setColor (index, r, g, b) {
    this.buffer[index * 3] = r;
    this.buffer[index * 3 + 1] = g;
    this.buffer[index * 3 + 2] = b;
  }
}

export default Palette;