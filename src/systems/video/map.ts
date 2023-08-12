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
    this.code = this._readInt32(0);
    this.length = this._readInt32(4);
    this.description = this._readAscii(8, 32);
    this.name = this._readAscii(40, 12);
    this.width = this._readInt32(52);
    this.height = this._readInt32(56);
    this.pointCount = this._readInt32(60);
    this.dataOffset = 64 + this.pointCount * 4;
    this.size = this.dataOffset + this.width * this.height;
    this.data = this.buffer.subarray(this.dataOffset, this.size);
  }

  _readInt32(offset: number): number {
    return (
      this.buffer[offset] |
      (this.buffer[offset + 1] << 8) |
      (this.buffer[offset + 2] << 16) |
      (this.buffer[offset + 3] << 24)
    );
  }

  _readAscii(offset: number, length: number): string {
    return String.fromCharCode(
      ...this.buffer.subarray(offset, offset + length)
    );
  }
}

export default DivMap;
