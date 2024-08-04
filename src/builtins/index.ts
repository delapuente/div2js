import Palette from "../systems/video/wgl2idx/palette";
import Fpg from "../systems/video/wgl2idx/fpg";
import { Runtime } from "../runtime/runtime";

function put_pixel(x: number, y: number, colorIndex: number, systems: Runtime) {
  systems.getSystem("video").screen.putPixel(x, y, colorIndex);
  return x; // XXX: put_pixel returns the x value. Checked empirically.
}

function put_screen(file: number, graph: number, systems: Runtime) {
  return systems.getSystem("video").putScreen(file, graph);
}

function rand(min: number, max: number) {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

function load_pal(palettePath: string, runtime: Runtime) {
  return runtime
    .getSystem("files")
    .loadPal(palettePath)
    .then((palFile) => {
      runtime.getSystem("video").setPalette(Palette.fromBuffer(palFile.buffer));
      return 1;
    });
}

function load_fpg(fpgPath: string, runtime: Runtime) {
  return runtime
    .getSystem("files")
    .loadFpg(fpgPath)
    .then((fpgFile) => {
      const fpgId = runtime
        .getSystem("video")
        .loadFpg(Fpg.fromBuffer(fpgFile.buffer));
      return fpgId;
    });
}

export { put_pixel, put_screen, rand, load_pal, load_fpg };
