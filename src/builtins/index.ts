import Palette from "../systems/video/wgl2idx/palette";
import Fpg from "../systems/video/wgl2idx/fpg";
import Div2Map from "../systems/video/wgl2idx/map";
import { Runtime } from "../runtime/runtime";
import {
  boxIntersection,
  spriteCoordinates,
} from "../systems/video/wgl2idx/transformations";

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

function collision(processType: number, runtime: Runtime) {
  const aliveProcesses = runtime.aliveProcesses;

  const currentProcess = runtime.currentProcess;
  const currentProcessView = runtime.getMemoryBrowser().process({
    id: currentProcess.id,
  });

  const currentBoxX0 = currentProcessView.local("reserved.box_x0").value;
  const currentBoxY0 = currentProcessView.local("reserved.box_y0").value;
  const currentBoxX1 = currentProcessView.local("reserved.box_x1").value;
  const currentBoxY1 = currentProcessView.local("reserved.box_y1").value;

  const collidingProcess = aliveProcesses.find((process) => {
    const processView = runtime.getMemoryBrowser().process({ id: process.id });
    if (processView.local("reserved.process_type").value !== processType) {
      return false;
    }

    const boxX0 = processView.local("reserved.box_x0").value;
    const boxY0 = processView.local("reserved.box_y0").value;
    const boxX1 = processView.local("reserved.box_x1").value;
    const boxY1 = processView.local("reserved.box_y1").value;

    const screenIntersection = boxIntersection(
      [currentBoxX0, currentBoxY0, currentBoxX1, currentBoxY1],
      [boxX0, boxY0, boxX1, boxY1],
    );

    if (screenIntersection === null) {
      return false;
    }

    return true;
  });

  return collidingProcess ? collidingProcess.id : 0;
}

export {
  put_pixel,
  put_screen,
  rand,
  load_pal,
  load_fpg,
  load_map,
  put,
  xput,
  collision,
};
