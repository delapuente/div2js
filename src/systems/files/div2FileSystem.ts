import { FPGFile } from "./urlFiles/fpg";
import { PALFile } from "./urlFiles/pal";
import { MAPFile } from "./urlFiles/map";

interface Div2FileSystem {
  loadPal(path: string): Promise<PALFile>;
  loadFpg(path: string): Promise<FPGFile>;
  loadMap(path: string): Promise<MAPFile>;
}

export { Div2FileSystem };
