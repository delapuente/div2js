import { DivError } from "../../../errors";
import DivMap from "./map";
import Palette from "./palette";

const mapsOffset = 1344;

class Fpg {
  readonly _divMaps: Map<number, DivMap> = new Map();

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
    const map = this._divMaps.get(index);
    if (!map) {
      throw new DivError(121);
    }
    return map;
  }

  _extractDivMaps(): Map<number, DivMap> {
    const divMaps = new Map();
    const mapBuffer = this.buffer.subarray(mapsOffset);
    let offset = 0;
    while (offset < mapBuffer.length) {
      const map = DivMap.fromWithinFpg(
        mapBuffer.subarray(offset),
        this.palette,
      );
      divMaps.set(map.code, map);
      offset += map.length;
    }
    return divMaps;
  }

  _extractPalette(): Palette {
    // TODO: extract the palette position accurately.
    const paletteBuffer = this.buffer.subarray(0, 768);
    const palette = Palette.fromBuffer(paletteBuffer);
    return palette;
  }
}

export default Fpg;
