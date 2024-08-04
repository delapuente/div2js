const VERSION_OFFSET = 7;

const CONTENT_OFFSET = 8;

export class FPGFile {
  readonly version: number;

  readonly buffer: Uint8Array;

  static fromArrayBuffer(buffer: ArrayBuffer) {
    const fpgBytes = _assertFpg(buffer);
    const version = fpgBytes[VERSION_OFFSET];
    const contentBytes = fpgBytes.slice(CONTENT_OFFSET);
    return new FPGFile(version, contentBytes);
  }

  constructor(version: number, contentBytes: Uint8Array) {
    this.version = version;
    this.buffer = contentBytes;
  }
}

function _assertFpg(buffer: ArrayBuffer): Uint8Array {
  const bytes = new Uint8Array(buffer);
  ["f", "p", "g", 0x1a, 0x0d, 0x0a, 0x00].forEach((code, index) => {
    const char = typeof code === "string" ? code.charCodeAt(0) : code;
    if (bytes[index] !== char) {
      throw new Error("The file is not a FPG file");
    }
  });
  return bytes;
}
