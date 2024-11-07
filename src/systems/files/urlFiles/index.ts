import { PALFile } from "./pal";
import { DivError } from "../../../errors";
import { FPGFile } from "./fpg";
import { MAPFile } from "./map";
import { System } from "../../../runtime/runtime";
import { Div2FileSystem } from "../div2FileSystem";

interface UrlFileSystemOptions {
  readonly rootUrl: string;
}

export default class UrlFileSystem implements System, Div2FileSystem {
  constructor(public options: UrlFileSystemOptions) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialize() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  run() {}

  loadMap(path: string): Promise<MAPFile> {
    const normalizedPath = this.normalizePath(path);
    return _loadMap(this._convertToUrl(normalizedPath));
  }

  loadPal(path: string): Promise<PALFile> {
    const normalizedPath = this.normalizePath(path);
    return _loadPal(this._convertToUrl(normalizedPath));
  }

  loadFpg(path: string): Promise<FPGFile> {
    const normalizedPath = this.normalizePath(path);
    return _loadFpg(this._convertToUrl(normalizedPath));
  }

  normalizePath(path: string): string {
    if (path.includes("/")) {
      return path;
    }
    const defaultDir = this._getDefaultDir(path);
    return defaultDir ? this._join(defaultDir, path) : path;
  }

  _getDefaultDir(path: string): string {
    const extension = this._getExtension(path);
    if (extension.toLowerCase() === "map") {
      return "MAP";
    }
    if (extension.toLowerCase() === "pal") {
      return "PAL";
    }
    if (extension.toLowerCase() === "fpg") {
      return "FPG";
    }
    return null;
  }

  _getExtension(path: string): string {
    return path.split(".").at(-1);
  }

  _convertToUrl(url: string): string {
    if (!this.options.rootUrl) {
      return url;
    }
    return this._join(this.options.rootUrl, url);
  }

  _join(...paths: string[]): string {
    return paths.reduce((acc, path) => {
      return acc.endsWith("/") ? acc + path : acc + "/" + path;
    });
  }
}

async function _loadMap(url: string): Promise<MAPFile> {
  const buffer = await _loadAsset(url);
  return MAPFile.fromArrayBuffer(buffer);
}

async function _loadPal(url: string): Promise<PALFile> {
  const buffer = await _loadAsset(url);
  return PALFile.fromArrayBuffer(buffer);
}

async function _loadFpg(url: string): Promise<FPGFile> {
  const buffer = await _loadAsset(url);
  return FPGFile.fromArrayBuffer(buffer);
}

async function _loadAsset(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (response.status === 404) {
    throw new DivError(102);
  }
  return response.arrayBuffer();
}
