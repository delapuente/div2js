import Palette from "../systems/video/wgl2idx/palette";
import Fpg from "../systems/video/wgl2idx/fpg";
import Div2Map from "../systems/video/wgl2idx/map";
import { Runtime } from "../runtime/runtime";

function put_pixel(x: number, y: number, colorIndex: number, runtime: Runtime) {
  runtime.getSystem("video").putPixel(x, y, colorIndex);
  return x; // XXX: put_pixel returns the x value. Checked empirically.
}

function put_screen(file: number, graph: number, runtime: Runtime) {
  return runtime.getSystem("video").putScreen(file, graph);
}

function rand(min: number, max: number) {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

function load_pal(palettePath: string, runtime: Runtime): Promise<number> {
  return runtime
    .getSystem("files")
    .loadPal(palettePath)
    .then((palFile) => {
      runtime.getSystem("video").setPalette(Palette.fromBuffer(palFile.buffer));
      return 1;
    });
}

function load_fpg(fpgPath: string, runtime: Runtime): Promise<number> {
  return runtime
    .getSystem("files")
    .loadFpg(fpgPath)
    .then((fpgFile) => {
      const videoSystem = runtime.getSystem("video");
      const fpg = Fpg.fromBuffer(fpgFile.buffer);
      const fpgId = videoSystem.loadFpg(fpg);
      if (!videoSystem.isPaletteLoaded()) {
        videoSystem.setPalette(fpg.palette);
      }
      return fpgId;
    });
}

function load_map(mapPath: string, runtime: Runtime): Promise<number> {
  return runtime
    .getSystem("files")
    .loadMap(mapPath)
    .then((mapFile) => {
      const videoSystem = runtime.getSystem("video");
      const map = Div2Map.fromBuffer(mapFile.buffer);
      const mapId = videoSystem.loadMap(map);
      if (!videoSystem.isPaletteLoaded()) {
        videoSystem.setPalette(map.palette);
      }
      return mapId;
    });
}

function put(
  file: number,
  graph: number,
  x: number,
  y: number,
  runtime: Runtime,
) {
  return runtime.getSystem("video").xput(file, graph, x, y, 0, 100, 0, 0);
}

function xput(
  file: number,
  graph: number,
  x: number,
  y: number,
  angle: number,
  size: number,
  flags: number,
  region: number,
  runtime: Runtime,
) {
  return runtime
    .getSystem("video")
    .xput(file, graph, x, y, angle, size, flags, region);
}

export { put_pixel, put_screen, rand, load_pal, load_fpg, load_map, put, xput };
