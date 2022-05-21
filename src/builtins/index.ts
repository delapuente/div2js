import Palette from "../systems/video/palette";

function put_pixel(x: number, y: number, colorIndex: number, systems: any) {
  systems.getSystem("video").screen.putPixel(x, y, colorIndex);
  return x; // XXX: put_pixel returns the x value. Checked empirically.
}

function rand(min: number, max: number) {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

function load_pal(palettePath: string, systems: any) {
  return systems
    .getSystem("files")
    .loadPal(palettePath)
    .then((palFile) => {
      systems.getSystem("video").setPalette(Palette.fromBuffer(palFile.buffer));
      return 1;
    });
}

export { put_pixel, rand, load_pal };
