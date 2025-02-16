export declare class PALFile {
    readonly version: number;
    readonly buffer: Uint8Array;
    readonly length = 256;
    static fromArrayBuffer(buffer: ArrayBuffer): PALFile;
    constructor(version: number, colorBytes: Uint8Array);
}
