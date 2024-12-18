import Fpg from "./wgl2idx/fpg";
import Map from "./wgl2idx/map";
import Palette from "./wgl2idx/palette";

interface Div2VideoSystem {
  putPixel(x: number, y: number, colorIndex: number): void;
  putScreen(fpgId: number, mapId: number): number;
  setPalette(palette: Palette): void;
  isPaletteLoaded(): boolean;
  loadFpg(fpg: Fpg): number;
  loadMap(map: Map): number;
  xput(
    fpgId: number,
    mapId: number,
    x: number,
    y: number,
    angle: number,
    size: number,
    flags: number,
    region: number,
  ): void;
  screenWidth: number;
  screenHeight: number;
  framebuffer: Uint8Array;
}

export { Div2VideoSystem };
