declare class Palette {
    readonly buffer: Uint8Array;
    readonly size: number;
    static fromBuffer(buffer: Uint8Array): Palette;
    constructor(buffer: Uint8Array);
    color(index: number): [number, number, number];
}
export default Palette;
