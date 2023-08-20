import DivMap from "./map";
import Palette from "./palette";

const mapsOffset = 1344;

class Fpg {
  readonly _divMaps: DivMap[] = [];

  readonly palette: Palette;

  static fromBuffer(buffer: Uint8Array): Fpg {
    const fpg = new Fpg(buffer);
    return fpg;
  }

  constructor(public readonly buffer: Uint8Array) {
    this.palette = this._extractPalette();
    this._divMaps = this._extractDivMaps();
  }

  map(index: number): DivMap {
    // TODO: validate index.
    return this._divMaps[index];
  }

  _extractDivMaps() {
    const divMaps: DivMap[] = [];
    const mapBuffer = this.buffer.subarray(mapsOffset);
    let offset = 0;
    while (offset < mapBuffer.length) {
      const map = DivMap.fromBuffer(mapBuffer.subarray(offset));
      divMaps.push(map);
      offset += map.size;
    }
    return divMaps;
  }

  _extractPalette(): Palette {
    // TODO: extract the palette position accurately.
    const paletteBuffer = this.buffer.subarray(0, mapsOffset);
    const palette = Palette.fromBuffer(paletteBuffer);
    return palette;
  }
}

export default Fpg;
