
class Palette {
  buffer: Uint8Array;

  constructor (public size) {
    this.buffer = new Uint8Array(size * 3);
  }
}

export default Palette;