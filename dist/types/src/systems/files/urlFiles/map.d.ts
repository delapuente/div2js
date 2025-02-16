export declare class MAPFile {
    readonly version: number;
    readonly buffer: Uint8Array;
    static fromArrayBuffer(buffer: ArrayBuffer): MAPFile;
    constructor(version: number, contentBytes: Uint8Array);
}
