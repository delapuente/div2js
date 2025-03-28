import { System } from "../../runtime/runtime";
import Fpg from "./wgl2idx/fpg";
import { GeometryData } from "./wgl2idx/geometry";
import Map from "./wgl2idx/map";
import Palette from "./wgl2idx/palette";

interface Div2VideoSystem extends System {
  enableTransparency(): void;
  disableTransparency(): void;
  isTransparent(colorIndex: number): boolean;
  getMap(fpgId: number, mapId: number): Map;
  putPixel(x: number, y: number, colorIndex: number): void;
  setPalette(palette: Palette): void;
  setActiveLayer(layer: "bg" | "fg"): void;
  setActiveRegion(region: number): void;
  isPaletteLoaded(): boolean;
  loadFpg(fpg: Fpg): number;
  loadMap(map: Map): number;
  putPixelData(
    data: Uint8Array,
    transform: GeometryData,
    alphaBlend: boolean,
  ): [number, number, number, number];
  screenWidth: number;
  screenHeight: number;
  framebuffer: Uint8Array;
}

export { Div2VideoSystem };
