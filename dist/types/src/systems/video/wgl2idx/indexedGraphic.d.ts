declare class IndexedGraphic {
    readonly width: number;
    readonly height: number;
    buffer: Uint8Array;
    constructor(width: number, height: number);
    clear(): void;
    putPixel(x: number, y: number, color: number): void;
    getPixel(x: number, y: number): number;
}
export default IndexedGraphic;
