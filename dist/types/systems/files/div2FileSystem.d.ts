import { FPGFile } from "./urlFiles/fpg";
import { PALFile } from "./urlFiles/pal";
import { MAPFile } from "./urlFiles/map";
import { System } from "../../runtime/runtime";
interface Div2FileSystem extends System {
    loadPal(path: string): Promise<PALFile>;
    loadFpg(path: string): Promise<FPGFile>;
    loadMap(path: string): Promise<MAPFile>;
}
export { Div2FileSystem };
