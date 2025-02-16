import DivMap from "./map";
import Palette from "./palette";
declare class Fpg {
    readonly buffer: Uint8Array;
    readonly _divMaps: Map<number, DivMap>;
    readonly palette: Palette;
    static fromBuffer(buffer: Uint8Array): Fpg;
    constructor(buffer: Uint8Array);
    map(index: number): DivMap;
    _extractDivMaps(): Map<number, DivMap>;
    _extractPalette(): Palette;
}
export default Fpg;
