import { PALFile } from "./pal";

export default class UrlFileSystem {

  initialize() {}

  run () {}

  loadPal(url: string): Promise<PALFile> {
    return _loadPal(url);
  }
}

async function _loadPal(url: string): Promise<PALFile> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return PALFile.fromArrayBuffer(buffer);
}