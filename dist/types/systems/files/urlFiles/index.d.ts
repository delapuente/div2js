import { PALFile } from "./pal";
import { FPGFile } from "./fpg";
import { MAPFile } from "./map";
import { Div2FileSystem } from "../div2FileSystem";
export default class UrlFileSystem implements Div2FileSystem {
    private _rootUrl;
    constructor(_rootUrl: string);
    initialize(): void;
    loadMap(path: string): Promise<MAPFile>;
    loadPal(path: string): Promise<PALFile>;
    loadFpg(path: string): Promise<FPGFile>;
    defaultDirPath(path: string): string;
    _getDefaultDir(path: string): string;
    _getExtension(path: string): string;
    _convertToUrl(url: string): string;
    _join(...paths: string[]): string;
}
