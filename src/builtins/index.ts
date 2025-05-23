import Palette from "../systems/video/wgl2idx/palette";
import Fpg from "../systems/video/wgl2idx/fpg";
import Div2Map, { MapDataComponent } from "../systems/video/wgl2idx/map";
import { Runtime } from "../runtime/runtime";
import {
  Dimensions,
  GeometryComponent,
  GeometryData,
  Point2D,
} from "../systems/video/wgl2idx/geometry";

function put_pixel(x: number, y: number, colorIndex: number, runtime: Runtime) {
  const videoSystem = runtime.getVideoSystem();
  videoSystem.setActiveLayer("bg");
  videoSystem.putPixel(x, y, colorIndex);
  return x; // XXX: put_pixel returns the x value. Checked empirically.
}

function put_screen(file: number, graph: number, runtime: Runtime) {
  const videoSystem = runtime.getVideoSystem();

  const map = videoSystem.getMap(file, graph);
  const { data, width, height } = map;
  const { screenWidth, screenHeight } = videoSystem;
  const [x, y] = [Math.round(screenWidth / 2), Math.round(screenHeight / 2)];
  const [xSpriteOrigin, ySpriteOrigin] = [
    Math.round(width / 2),
    Math.round(height / 2),
  ];
  const transform = new GeometryData(
    new Point2D(xSpriteOrigin, ySpriteOrigin),
    new Dimensions(width, height),
    new Point2D(x, y),
    0,
    1,
    [false, false],
  );

  videoSystem.setActiveLayer("bg");
  videoSystem.setActiveRegion(0);
  videoSystem.disableTransparency();
  videoSystem.putPixelData(data, transform, false);

  return 0;
}

function rand(min: number, max: number) {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

function load_pal(palettePath: string, runtime: Runtime): Promise<number> {
  return runtime
    .getFileSystem()
    .loadPal(palettePath)
    .then((palFile) => {
      runtime.getVideoSystem().setPalette(Palette.fromBuffer(palFile.buffer));
      return 1;
    });
}

function load_fpg(fpgPath: string, runtime: Runtime): Promise<number> {
  return runtime
    .getFileSystem()
    .loadFpg(fpgPath)
    .then((fpgFile) => {
      const videoSystem = runtime.getVideoSystem();
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
    .getFileSystem()
    .loadMap(mapPath)
    .then((mapFile) => {
      const videoSystem = runtime.getVideoSystem();
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
  return xput(file, graph, x, y, 0, 100, 0, 0, runtime);
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
  const videoSystem = runtime.getVideoSystem();

  const map = videoSystem.getMap(file, graph);
  const { data, width, height } = map;
  const { x: xOrigin, y: yOrigin } = map.origin;
  const alphaBlend = !!(flags & 4);
  const transform = new GeometryData(
    new Point2D(xOrigin, yOrigin),
    new Dimensions(width, height),
    new Point2D(x, y),
    (angle * Math.PI) / 180000,
    size / 100,
    [!!(flags & 1), !!(flags & 2)],
  );

  videoSystem.setActiveLayer("bg");
  videoSystem.setActiveRegion(region);
  videoSystem.enableTransparency();
  return videoSystem.putPixelData(data, transform, alphaBlend);
}

function collision(processType: number, runtime: Runtime) {
  const processes = runtime.aliveProcesses;
  const videoSystem = runtime.getVideoSystem();

  const caller = runtime.currentProcess;
  const callerMapData = videoSystem.getComponent(caller, MapDataComponent);
  const callerGeometry = videoSystem.getComponent(caller, GeometryComponent);
  const callerBoundingBox = callerGeometry.boundingBox;

  const collidingProcess = processes.find((process) => {
    // Filter by type.
    if (process.processType !== processType) {
      return false;
    }

    // Ignore colliding with itself.
    if (process.processId === caller.processId) {
      return false;
    }

    // Find out if the caller and the process are intersecting.
    const geometry = videoSystem.getComponent(process, GeometryComponent);
    const boundingBox = geometry.boundingBox;
    const intersection = callerBoundingBox.getIntersection(boundingBox);

    if (intersection === null) {
      return false;
    }

    // If there is an intersection, check if there is an overlapping of non-transparent pixels.
    const mapData = videoSystem.getComponent(process, MapDataComponent);
    for (let x = intersection.x0; x <= intersection.x1; x++) {
      for (let y = intersection.y0; y <= intersection.y1; y++) {
        const currentColorIndex = callerMapData.sample(
          ...callerGeometry.mapCoordinates(x, y),
        );
        const processColorIndex = mapData.sample(
          ...geometry.mapCoordinates(x, y),
        );
        if (
          currentColorIndex !== null &&
          !videoSystem.isTransparent(currentColorIndex) &&
          processColorIndex !== null &&
          !videoSystem.isTransparent(processColorIndex)
        ) {
          return true;
        }
      }
    }

    // If there is not overlapping, there is no collision.
    return false;
  });

  return collidingProcess ? collidingProcess.processId : 0;
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
