
const VERSION_OFFSET = 7;

const PAL_OFFSET = 8;

const GAMMA_OFFSET = 776;

export class PALFile {

  readonly version: number;

  readonly buffer: Uint8Array;

  readonly length = 256;

  static fromArrayBuffer(buffer: ArrayBuffer) {
    const palBytes = _assertPal(buffer);
    const version = palBytes[VERSION_OFFSET];
    const colorBytes = palBytes.slice(PAL_OFFSET, PAL_OFFSET + 256 * 3);
    return new PALFile(version, colorBytes);
  }

  constructor(version: number, colorBytes: Uint8Array) {
    this.version = version;
    this.buffer = colorBytes;
  }

};

function _assertPal(buffer: ArrayBuffer): Uint8Array {
  const bytes = new Uint8Array(buffer);
  ['p', 'a', 'l', 0x1A, 0x0D, 0x0A, 0x00].forEach((code, index) => {
    const char = typeof code === 'string' ? code.charCodeAt(0) : code;
    if (bytes[index] !== char) {
      throw new Error('The file is not a PAL file');
    }
  });
  return bytes;
}