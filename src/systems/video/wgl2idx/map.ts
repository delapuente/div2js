class ControlPoint {
  constructor(public readonly x: number, public readonly y: number) {}
}

class DivMap {
  // TODO: double-check with DIV manuals to implement integrity
  // tests and validation.

  readonly code: number;

  readonly length: number;

  readonly description: string;

  readonly name: string;

  readonly width: number;

  readonly height: number;

  readonly pointCount: number;

  readonly dataOffset: number;

  readonly size: number;

  readonly data: Uint8Array;

  static fromBuffer(buffer: Uint8Array): DivMap {
    const map = new DivMap(buffer);
    return map;
  }

  constructor(public readonly buffer: Uint8Array) {
    this.code = this._readDoubleWord(0);
    this.length = this._readDoubleWord(4);
    this.description = this._readAscii(8, 32);
    this.name = this._readAscii(40, 12);
    this.width = this._readDoubleWord(52);
    this.height = this._readDoubleWord(56);
    this.pointCount = this._readDoubleWord(60);
    this.dataOffset = 64 + this.pointCount * 4;
    this.data = this.buffer.subarray(this.dataOffset, this.length);
  }

  controlPoint(index: number): ControlPoint {
    const x = this._readWord(64 + index * 4);
    const y = this._readWord(64 + index * 4 + 2);
    // XXX: Assuming that 0xFFFF is the default value for the center. This is not documented.
    // XXX: Also assuming rounding-up in case of odd size values.
    return new ControlPoint(
      x == 0xFFFF ? Math.ceil(this.width / 2) : x,
      y == 0xFFFF ? Math.ceil(this.height / 2) : y,
    );
  }

  _readWord(offset: number): number {
    return this.buffer[offset] | (this.buffer[offset + 1] << 8);
  }

  _readDoubleWord(offset: number): number {
    return (
      this.buffer[offset] |
      (this.buffer[offset + 1] << 8) |
      (this.buffer[offset + 2] << 16) |
      (this.buffer[offset + 3] << 24)
    );
  }

  _readAscii(offset: number, length: number): string {
    return String.fromCharCode(
      ...this.buffer.subarray(offset, offset + length),
    );
  }
}

export { ControlPoint };
export default DivMap;
