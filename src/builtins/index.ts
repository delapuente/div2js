import Palette from "../systems/video/palette";
import Fpg from "../systems/video/fpg";

function put_pixel(x: number, y: number, colorIndex: number, systems: any) {
  systems.getSystem("video").screen.putPixel(x, y, colorIndex);
  return x; // XXX: put_pixel returns the x value. Checked empirically.
}

function put_screen(file: number, graph: number, systems: any) {
  return systems.getSystem("video").putScreen(file, graph);
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

function load_fpg(fpgPath: string, systems: any) {
  return systems
    .getSystem("files")
    .loadFpg(fpgPath)
    .then((fpgFile) => {
      const fpgId = systems
        .getSystem("video")
        .loadFpg(Fpg.fromBuffer(fpgFile.buffer));
      return fpgId;
    });
}

export { put_pixel, put_screen, rand, load_pal, load_fpg };
