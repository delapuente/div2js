class Palette {
  // TODO: double-check with DIV manuals to implement integrity
  // tests and validation.

  readonly size: number;

  static fromBuffer(buffer: Uint8Array): Palette {
    const palette = new Palette(buffer);
    return palette;
  }

  static withSize(size: number): Palette {
    const buffer = new Uint8Array(size * 3);
    return new Palette(buffer);
  }

  constructor(public readonly buffer: Uint8Array) {
    // TODO: validate buffer size
    this.size = buffer.length / 3;
  }
}

export default Palette;
