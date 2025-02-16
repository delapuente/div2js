export declare class PRGFile {
    readonly buffer: Uint16Array;
    static fromArrayBuffer(buffer: ArrayBuffer): PRGFile;
    readonly text: string;
    constructor(buffer: Uint16Array);
}
