import { PALFile } from "./pal";
import { FPGFile } from "./fpg";
import { MAPFile } from "./map";
import { System } from "../../../runtime/runtime";
import { Div2FileSystem } from "../div2FileSystem";
interface UrlFileSystemOptions {
    readonly rootUrl: string;
}
export default class UrlFileSystem implements System, Div2FileSystem {
    options: UrlFileSystemOptions;
    constructor(options: UrlFileSystemOptions);
    initialize(): void;
    run(): void;
    loadMap(path: string): Promise<MAPFile>;
    loadPal(path: string): Promise<PALFile>;
    loadFpg(path: string): Promise<FPGFile>;
    defaultDirPath(path: string): string;
    _getDefaultDir(path: string): string;
    _getExtension(path: string): string;
    _convertToUrl(url: string): string;
    _join(...paths: string[]): string;
}
export {};
