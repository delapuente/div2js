const VERSION_OFFSET = 7;

const CONTENT_OFFSET = 8;

export class MAPFile {
  readonly version: number;

  readonly buffer: Uint8Array;

  static fromArrayBuffer(buffer: ArrayBuffer) {
    const fpgBytes = _assertMap(buffer);
    const version = fpgBytes[VERSION_OFFSET];
    const contentBytes = fpgBytes.slice(CONTENT_OFFSET);
    return new MAPFile(version, contentBytes);
  }

  constructor(version: number, contentBytes: Uint8Array) {
    this.version = version;
    this.buffer = contentBytes;
  }
}

function _assertMap(buffer: ArrayBuffer): Uint8Array {
  const bytes = new Uint8Array(buffer);
  ["m", "a", "p", 0x1a, 0x0d, 0x0a, 0x00].forEach((code, index) => {
    const char = typeof code === "string" ? code.charCodeAt(0) : code;
    if (bytes[index] !== char) {
      throw new Error("The file is not a MAP file");
    }
  });
  return bytes;
}
