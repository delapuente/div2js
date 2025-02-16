export declare class FPGFile {
    readonly version: number;
    readonly buffer: Uint8Array;
    static fromArrayBuffer(buffer: ArrayBuffer): FPGFile;
    constructor(version: number, contentBytes: Uint8Array);
}
