import Palette from "./palette";

class ControlPoint {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}
}

class DivMap {
  // TODO: double-check with DIV manuals to implement integrity
  // tests and validation.

  static fromWithinFpg(buffer: Uint8Array, palette: Palette): DivMap {
    const reader = new ByteReader(buffer);
    const code = reader.readDoubleWord(0);
    const mapRecordLength = reader.readDoubleWord(4);
    const description = reader.readAscii(8, 32);
    const name = reader.readAscii(40, 12);
    const width = reader.readDoubleWord(52);
    const height = reader.readDoubleWord(56);
    const center = new ControlPoint(
      Math.ceil(width / 2),
      Math.ceil(height / 2),
    );
    const pointCount = reader.readDoubleWord(60);
    const controlPoints = Array.from({ length: pointCount }, (_, index) => {
      const x = reader.readWord(64 + index * 4);
      const y = reader.readWord(64 + index * 4 + 2);
      // XXX: Assuming that 0xFFFF is the default value for the center. This is not documented.
      // XXX: Also assuming rounding-up in case of odd size values.
      return new ControlPoint(
        x == 0xffff ? Math.ceil(width / 2) : x,
        y == 0xffff ? Math.ceil(height / 2) : y,
      );
    });
    const dataOffset = 64 + pointCount * 4;
    const data = buffer.subarray(dataOffset, mapRecordLength);
    const map = new DivMap(
      code,
      mapRecordLength,
      description,
      name,
      width,
      height,
      center,
      controlPoints,
      data,
      palette,
    );
    return map;
  }

  static fromBuffer(buffer: Uint8Array): DivMap {
    const reader = new ByteReader(buffer);
    const width = reader.readWord(0);
    const height = reader.readWord(2);
    const center = new ControlPoint(
      Math.ceil(width / 2),
      Math.ceil(height / 2),
    );
    const code = reader.readDoubleWord(4);
    const description = reader.readAscii(8, 32);
    const palette = Palette.fromBuffer(buffer.subarray(40, 808));
    //TODO: Maps can have an own palette and gamma, but I think that data is
    // only for `load_pal()` to deal with.
    const pointCount = reader.readWord(1384);
    const controlPoints = Array.from({ length: pointCount }, (_, index) => {
      const x = reader.readWord(1386 + index * 4);
      const y = reader.readWord(1386 + index * 4 + 2);
      // XXX: Assuming that 0xFFFF is the default value for the center. This is not documented.
      // XXX: Also assuming rounding-up in case of odd size values.
      return new ControlPoint(
        x == 0xffff ? Math.ceil(width / 2) : x,
        y == 0xffff ? Math.ceil(height / 2) : y,
      );
    });
    const dataOffset = 1386 + pointCount * 4;
    const mapRecordLength = dataOffset + width * height;
    const data = buffer.subarray(dataOffset, mapRecordLength);
    const map = new DivMap(
      code,
      mapRecordLength,
      description,
      null,
      width,
      height,
      center,
      controlPoints,
      data,
      palette,
    );
    return map;
  }

  constructor(
    readonly code: number,
    readonly length: number,
    readonly description: string,
    readonly name: string | null,
    readonly width: number,
    readonly height: number,
    readonly center: ControlPoint,
    private readonly controlPoints: ControlPoint[],
    readonly data: Uint8Array,
    readonly palette: Palette,
  ) {}

  get controlPointCount(): number {
    return this.controlPoints.length;
  }

  controlPoint(index: number): ControlPoint {
    return this.controlPoints[index];
  }
}

class ByteReader {
  constructor(public readonly buffer: Uint8Array) {}

  readWord(offset: number): number {
    return this.buffer[offset] | (this.buffer[offset + 1] << 8);
  }

  readDoubleWord(offset: number): number {
    return (
      this.buffer[offset] |
      (this.buffer[offset + 1] << 8) |
      (this.buffer[offset + 2] << 16) |
      (this.buffer[offset + 3] << 24)
    );
  }

  readAscii(offset: number, length: number): string {
    return String.fromCharCode(
      ...this.buffer.subarray(offset, offset + length),
    );
  }
}

export { ControlPoint };
export default DivMap;
