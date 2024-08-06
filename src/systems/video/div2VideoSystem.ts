import Fpg from "./wgl2idx/fpg";
import IndexedGraphic from "./wgl2idx/indexedGraphic";
import Palette from "./wgl2idx/palette";

interface Div2VideoSystem {
  screen: IndexedGraphic;
  putScreen(fpgId: number, mapId: number): number;
  setPalette(palette: Palette): void;
  loadFpg(fpg: Fpg): number;
}

export { Div2VideoSystem };
