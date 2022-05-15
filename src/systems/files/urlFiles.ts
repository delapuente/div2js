import { PALFile } from "./pal";
import { DivError } from "../../errors";

interface UrlFileSystemOptions {
  readonly rootUrl: string;
}

export default class UrlFileSystem {
  constructor(public options: UrlFileSystemOptions) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialize() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  run() {}

  loadPal(path: string): Promise<PALFile> {
    const normalizedPath = this._normalizePath(path);
    return _loadPal(this._convertToUrl(normalizedPath));
  }

  _normalizePath(path: string): string {
    if (path.includes("/")) {
      return path;
    }
    const defaultDir = this._getDefaultDir(path);
    return defaultDir ? this._join(defaultDir, path) : path;
  }

  _getDefaultDir(path: string): string {
    const extension = this._getExtension(path);
    if (extension.toLowerCase() === "pal") {
      return "PAL";
    }
    return null;
  }

  _getExtension(path: string): string {
    return path.split(".").at(-1);
  }

  _convertToUrl(url: string): string {
    return this._join(this.options.rootUrl, url);
  }

  _join(...paths: string[]): string {
    return paths.reduce((acc, path) => {
      return acc.endsWith("/") ? acc + path : acc + "/" + path;
    });
  }
}

async function _loadPal(url: string): Promise<PALFile> {
  const response = await fetch(url);
  if (response.status === 404) {
    throw new DivError(102);
  }
  const buffer = await response.arrayBuffer();
  return PALFile.fromArrayBuffer(buffer);
}
