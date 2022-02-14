import { PALFile } from "./pal";

interface UrlFileSystemOptions {
  readonly rootUrl: string;
}

export default class UrlFileSystem {

  constructor(public options: UrlFileSystemOptions) {

  }

  initialize() {}

  run () {}

  loadPal(url: string): Promise<PALFile> {
    return _loadPal(this._getPath(url));
  }

  _getPath(url: string): string {
    return this.options.rootUrl + url;
  }
}

async function _loadPal(url: string): Promise<PALFile> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return PALFile.fromArrayBuffer(buffer);
}