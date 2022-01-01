
class IndexedGraphic {

  buffer: Uint8Array;

  constructor (
    public width: number,
    public height: number
  ) {
    this.buffer = new Uint8Array(width * height);
  }
}

export default IndexedGraphic;