import { FPGFile } from "./urlFiles/fpg";
import { PALFile } from "./urlFiles/pal";

interface Div2FileSystem {
  loadPal(path: string): Promise<PALFile>;
  loadFpg(path: string): Promise<FPGFile>;
}

export { Div2FileSystem };