import { Runtime } from "../../../runtime/runtime";
import Fpg from "./fpg";
import IndexedGraphic from "./indexedGraphic";
import Palette from "./palette";
import { Div2VideoSystem } from "../div2VideoSystem";
import DivMap, { MapDataComponent } from "./map";
import { MemoryBrowser, ProcessView } from "../../../memoryBrowser/mapper";
import {
  GeometryComponent,
  screenCoordinates,
  mapCoordinates,
} from "./geometry";
import { Process } from "../../../runtime/scheduler";

// XXX: Just for enabling syntax highlighting for the shaders.
function glsl(strings: TemplateStringsArray, ...values: unknown[]) {
  return String.raw({ raw: strings }, ...values);
}

const vsSource = glsl`#version 300 es
#pragma vscode_glsllint_stage: vert

in vec4 a_position;

out vec2 v_texcoord;

void main() {
  gl_Position = a_position;
  // Convert from clip space: origin at bottom left (-1, -1)...
  // ...to texture coordiantes: origin at top left (0, 0).
  v_texcoord = a_position.xy * vec2(0.5, -0.5) + 0.5;
}`;

const psSource = glsl`#version 300 es
#pragma vscode_glsllint_stage: frag

precision mediump float;

in vec2 v_texcoord;

out vec4 color;

uniform sampler2D u_screen;
uniform sampler2D u_palette;

// DIV palettes have colors with intensities ranging from 0 to 63.
// We need to convert them to 0 to 255.
const float COLOR_INTENSITY_FACTOR = 255.0/63.0;

void main() {
  // Obtain the palette color index from the screen.
  float index = texture(u_screen, v_texcoord).a * 255.0;

  // Obtain the actual color from the palette.
  color =
    texture(u_palette, vec2((index + 0.5)/256.0, 0.5)) *
    COLOR_INTENSITY_FACTOR;
}`;

class VideoSystemError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  const errorMessage = gl.getShaderInfoLog(shader);
  gl.deleteShader(shader);
  throw new VideoSystemError(errorMessage);
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  const errorMessage = gl.getProgramInfoLog(program);
  gl.deleteProgram(program);
  throw new VideoSystemError(errorMessage);
}

const DEFAULT_RESOLUTION_WIDTH = 320;
const DEFAULT_RESOLUTION_HEIGHT = 200;

function getDefaultScreen(
  width: number = DEFAULT_RESOLUTION_WIDTH,
  height: number = DEFAULT_RESOLUTION_HEIGHT,
): IndexedGraphic {
  return new IndexedGraphic(width, height);
}

type Color = [number, number, number];

/**
 * Render the video data –the screen– into an HTML canvas.
 *
 * In DIV, video data is simply referred as the "screen". Thus, operations, and
 * processes _draw on the screen_. The screen is a 2D array of indices. Indices
 * range from 0 to 255 and refer to a position in a global palette that stores
 * color data.
 *
 * Colors in the palette are triplets red, green, and blue. Each of 1 byte,
 * representing one of 64 valid color intensities, from 0 to 63.
 *
 * For instance, a 8x8 screen:
 *
 * ```
 * 0,0,1,1,1,1,0,0,
 * 0,1,0,0,0,0,1,0,
 * 1,0,0,0,0,0,0,1,
 * 1,0,2,0,0,2,0,1,
 * 1,0,0,0,0,0,0,1,
 * 1,0,3,3,3,3,0,1,
 * 0,1,0,0,0,0,1,0,
 * 0,0,1,1,1,1,0,0,
 * ```
 *
 * And the 4 first colors in the palette:
 *
 * ```
 *  0,  0,  0, (black)
 * 63,  0,  0, (red)
 *  0, 63,  0, (green)
 *  0,  0, 63, (blue)
 *  ...
 * ```
 *
 * The present implementation uses the CPU for manipulating the screen and
 * palette. Both are unsigned byte typed arrays.
 *
 * Every frame, the system sends both arrays to the GPU in the form of
 * textures. The screen texture is a single-channel (alpha channel) 2D texture
 * of "width x height" size. The palette texture is a 3-channel (RGB channels)
 * 2D texture of 256 x 1 size.
 *
 * The vertex shader converts clip-space coordinates to texture coordinates.
 * The fragment shader uses the texture coordinates to look up the palette
 * index in the screen texture, and then look up the color in the palette using
 * the index.
 *
 * Finally, the intensity values are interpolated from 0 to 255 to get the
 * final color.
 */
class WebGL2IndexedScreenVideoSystem implements Div2VideoSystem {
  //XXX: According to DIV2 `load_map()` documentation, in the "Importante" note.
  // This is because the maps belonging to FPGs can only have a code from 1 to
  // 999, and so the maps loaded with `load_map()` are assigned codes starting
  // from 1000.
  readonly _noFpgMapIdOffset = 1000;

  readonly _transparentIndex: number = 0;

  private _screenCorners = new Float32Array([
    1, 1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
  ]);

  private _screenGeometryVertexCount: number = this._screenCorners.length / 2;

  private _gl: WebGL2RenderingContext;

  private _gpuProgram: WebGLProgram;

  private _framebuffer: Uint8Array;

  // TODO: Double check if it is possible to access the FPG data directly from
  // the DIV program. If so, we should imitate the DIV behavior and store the
  // FPG in the program memory. The system could keep indices to conveninet places
  // for quick access.
  private readonly _loadedFpgs: Map<number, Fpg>;

  // TODO: Double check if it is possible to access the MAP data directly from
  // the DIV program. If so, we should imitate the DIV behavior and store the
  // MAP in the program memory. The system could keep indices to conveninet places
  // for quick access.

  // XXX: DIV2 behaviour is a bit strange here. Anything loaded with
  // `load_map()` belongs to the FPG 0, but the FPG 0 is also the first FPG
  // loaded with `load_fpg()`.
  private readonly _loadedMaps: Map<number, DivMap>;

  private _memoryBrowser: MemoryBrowser;

  private _activeLayer: IndexedGraphic;

  // TODO: Regardless of the above, it would be a good idea to separate the
  // duty of managing FPGs, MAPs, PALs, and other resources from the video
  // system, into a Resource Manager.

  // This is the default pallete used by DIV2. It is the same as the one used
  // by the first version of DIV. It corresponds to the "DIV.PAL" file.
  palette: Palette = new Palette(
    new Uint8Array([
      0, 0, 0, 4, 4, 4, 8, 8, 8, 12, 12, 12, 16, 16, 16, 21, 21, 21, 25, 25, 25,
      29, 29, 29, 33, 33, 33, 37, 37, 37, 42, 42, 42, 46, 46, 46, 50, 50, 50,
      54, 54, 54, 58, 58, 58, 63, 63, 63, 10, 0, 0, 18, 0, 0, 27, 0, 0, 36, 0,
      0, 45, 0, 0, 54, 0, 0, 63, 0, 0, 63, 8, 0, 63, 16, 0, 63, 24, 0, 63, 32,
      0, 63, 40, 0, 63, 45, 14, 63, 50, 28, 63, 55, 42, 63, 60, 56, 0, 10, 0, 0,
      15, 0, 0, 21, 0, 0, 27, 0, 0, 33, 0, 0, 39, 0, 0, 45, 0, 0, 51, 0, 0, 57,
      0, 0, 63, 0, 12, 63, 8, 24, 63, 16, 36, 63, 24, 48, 63, 33, 54, 63, 44,
      60, 63, 55, 0, 0, 10, 0, 0, 18, 0, 0, 26, 0, 0, 35, 0, 0, 43, 0, 0, 52, 0,
      0, 63, 0, 12, 63, 0, 25, 63, 0, 37, 63, 0, 50, 63, 0, 63, 63, 14, 63, 63,
      28, 63, 63, 42, 63, 63, 56, 63, 63, 7, 7, 0, 13, 13, 0, 19, 19, 0, 25, 25,
      0, 31, 31, 0, 38, 38, 0, 44, 44, 0, 50, 50, 0, 56, 56, 0, 63, 63, 0, 63,
      63, 9, 63, 63, 18, 63, 63, 27, 63, 63, 36, 63, 63, 45, 63, 63, 55, 7, 0,
      7, 13, 0, 13, 19, 0, 19, 25, 0, 25, 31, 0, 31, 38, 0, 38, 44, 0, 44, 50,
      0, 50, 56, 0, 56, 63, 0, 63, 63, 9, 63, 63, 18, 63, 63, 28, 63, 63, 37,
      63, 63, 46, 63, 63, 56, 63, 0, 5, 5, 0, 10, 10, 0, 15, 15, 0, 20, 20, 0,
      26, 25, 0, 31, 30, 0, 36, 36, 0, 41, 41, 0, 47, 46, 0, 52, 51, 0, 57, 56,
      0, 63, 62, 11, 63, 62, 23, 63, 62, 35, 63, 62, 47, 63, 62, 6, 3, 0, 11, 6,
      0, 16, 9, 0, 21, 12, 0, 27, 15, 0, 32, 18, 0, 37, 21, 0, 42, 24, 0, 48,
      28, 0, 49, 32, 7, 51, 36, 15, 53, 40, 23, 54, 45, 30, 56, 49, 38, 58, 53,
      46, 60, 58, 54, 6, 3, 3, 10, 5, 5, 15, 8, 8, 20, 11, 11, 24, 13, 13, 29,
      16, 16, 34, 19, 19, 39, 22, 22, 44, 26, 26, 49, 30, 30, 54, 34, 34, 60,
      38, 38, 60, 42, 42, 61, 47, 47, 61, 51, 51, 62, 56, 56, 6, 5, 3, 11, 9, 6,
      17, 13, 9, 22, 18, 12, 28, 22, 15, 33, 26, 18, 39, 31, 22, 43, 35, 25, 47,
      39, 28, 51, 44, 31, 55, 48, 34, 60, 53, 38, 60, 54, 42, 61, 56, 47, 61,
      58, 51, 62, 60, 56, 8, 2, 0, 15, 4, 0, 22, 7, 0, 30, 9, 0, 37, 12, 0, 44,
      14, 0, 52, 17, 0, 54, 22, 0, 56, 28, 0, 58, 34, 0, 60, 40, 0, 63, 46, 0,
      63, 50, 14, 63, 54, 28, 63, 58, 42, 63, 63, 56, 5, 3, 3, 9, 6, 6, 14, 9,
      9, 18, 12, 12, 23, 16, 16, 27, 19, 19, 32, 22, 22, 36, 25, 25, 41, 29, 29,
      43, 33, 33, 46, 37, 37, 48, 41, 41, 51, 45, 45, 53, 49, 49, 56, 53, 53,
      59, 58, 58, 3, 5, 3, 6, 9, 6, 9, 14, 9, 12, 18, 12, 16, 23, 16, 19, 27,
      19, 22, 32, 22, 25, 36, 25, 29, 41, 29, 33, 43, 33, 37, 46, 37, 41, 48,
      41, 45, 51, 45, 49, 53, 49, 53, 56, 53, 58, 59, 58, 3, 3, 4, 6, 6, 8, 9,
      9, 12, 12, 12, 16, 16, 16, 20, 19, 19, 24, 22, 22, 28, 25, 25, 32, 29, 29,
      37, 33, 33, 40, 37, 37, 43, 41, 41, 46, 45, 45, 49, 49, 49, 52, 53, 53,
      55, 58, 58, 59, 10, 0, 0, 20, 0, 0, 31, 0, 0, 41, 0, 0, 52, 0, 0, 63, 0,
      0, 63, 10, 0, 63, 21, 0, 63, 31, 0, 63, 42, 0, 63, 52, 0, 63, 63, 0, 63,
      63, 11, 63, 63, 23, 63, 63, 35, 63, 63, 47, 0, 0, 0, 0, 0, 22, 0, 0, 32,
      0, 0, 42, 0, 0, 52, 0, 0, 62, 10, 0, 62, 21, 0, 62, 31, 0, 62, 42, 0, 62,
      52, 0, 62, 63, 0, 63, 63, 13, 63, 63, 27, 63, 63, 41, 63, 63, 55, 63,
    ]),
  );

  _isPaletteLoaded: boolean = false;

  _ignoreTransparency: boolean = false;

  constructor(
    canvas,
    private readonly _bgLayer: IndexedGraphic = getDefaultScreen(),
    private readonly _fgLayer: IndexedGraphic = getDefaultScreen(),
  ) {
    // XXX: The preserveDrawingBuffer option is necessary for the tests to work.
    // It should be possible to make it dependant on the type of build (dev, or prod).
    // Or, we could invoke the debug handler in the same event loop cycle to avoid
    // the automatic clearing of the buffer. See:
    // https://stackoverflow.com/questions/44510299/webgl-2-when-to-clear-the-drawing-buffer
    this._gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true });
    this._loadedFpgs = new Map();
    this._loadedMaps = new Map();
    this._framebuffer = new Uint8Array(_bgLayer.width * _bgLayer.height * 4);
    this._activeLayer = _bgLayer;
  }

  isPaletteLoaded(): boolean {
    return this._isPaletteLoaded;
  }

  initialize(memoryBrowser: MemoryBrowser) {
    this._initShaders();
    this._loadScreenGeometry();
    this._configureScreenVao();
    this._configureScreenTexture();
    this._configurePaletteTexture();
    const { width, height } = this._bgLayer;
    this.setViewportResolution(width, height);
    this._memoryBrowser = memoryBrowser;
  }

  getComponent<T>(
    process: Process,
    componentType: new (...args: unknown[]) => T,
  ): T {
    const processView = this._memoryBrowser.process({
      id: process.processId,
    });
    if (componentType === GeometryComponent) {
      return new GeometryComponent(
        process,
        (fpgId, mapId) => this.getMap(fpgId, mapId),
        processView,
      ) as T;
    }
    if (componentType === MapDataComponent) {
      return new MapDataComponent(
        process,
        (fpgId, mapId) => this.getMap(fpgId, mapId),
        processView,
      ) as T;
    }
    throw new Error(`Component \`${componentType.name}\` unknown.`);
  }

  get framebuffer(): Uint8Array {
    // XXX: The framebuffer is flipped in the Y axis. The DIV engine uses the
    // top-left corner as the origin, while WebGL uses the bottom-left corner.
    this._gl.readPixels(
      0,
      0,
      this._bgLayer.width,
      this._bgLayer.height,
      this._gl.RGBA,
      this._gl.UNSIGNED_BYTE,
      this._framebuffer,
    );
    return flipBufferY(
      this._framebuffer,
      this._bgLayer.width,
      this._bgLayer.height,
    );
  }

  get screenWidth(): number {
    return this._bgLayer.width;
  }

  get screenHeight(): number {
    return this._bgLayer.height;
  }

  run(runtime: Runtime) {
    this._drawProcesses(runtime);

    this._sendPalette();
    this._sendFrameBuffer();
    this._drawScreen();
    this._flush();
  }

  setViewportResolution(width, height) {
    const gl = this._gl;
    gl.canvas.width = width;
    gl.canvas.height = height;
    gl.viewport(0, 0, width, height);
  }

  setPalette(palette: Palette) {
    this.palette = palette;
    this._isPaletteLoaded = true;
  }

  enableTransparency() {
    this._ignoreTransparency = false;
  }

  disableTransparency() {
    this._ignoreTransparency = true;
  }

  loadFpg(fpg: Fpg) {
    const fpgId = this._nextFpgId();
    this._loadedFpgs.set(fpgId, fpg);
    return fpgId;
  }

  loadMap(map: DivMap): number {
    const mapId = this._nextMapId();
    this._loadedMaps.set(mapId, map);
    return mapId;
  }

  putPixel(x: number, y: number, colorIndex: number): void {
    this._activeLayer.putPixel(x, y, colorIndex);
  }

  putPixelData(
    data: Uint8Array,
    width: number,
    height: number,
    x: number,
    y: number,
    xOrigin: number,
    yOrigin: number,
    angle: number,
    size: number,
    flags: number,
    region: number,
  ): [number, number, number, number] {
    // TODO: Regions.
    if (region !== 0) {
      console.warn("Regions are not supported yet.");
    }

    // Calculate transformation parameters.
    const rotation = (angle * Math.PI) / 180000;
    const scaleFactor = size / 100;
    const withHorizontalFlip = (flags & 1) !== 0;
    const withVerticalFlip = (flags & 2) !== 0;
    const withTransparency = (flags & 4) !== 0;

    // Calculate the screen region to update.
    // T stands for top, L for left, B for bottom, and R for right.
    const [xTL, yTL] = screenCoordinates(
      [0, 0],
      [width, height],
      [false, false],
      [xOrigin, yOrigin],
      [x, y],
      rotation,
      scaleFactor,
    );

    const [xTR, yTR] = screenCoordinates(
      [width, 0],
      [width, height],
      [false, false],
      [xOrigin, yOrigin],
      [x, y],
      rotation,
      scaleFactor,
    );

    const [xBL, yBL] = screenCoordinates(
      [0, height],
      [width, height],
      [false, false],
      [xOrigin, yOrigin],
      [x, y],
      rotation,
      scaleFactor,
    );

    const [xBR, yBR] = screenCoordinates(
      [width, height],
      [width, height],
      [false, false],
      [xOrigin, yOrigin],
      [x, y],
      rotation,
      scaleFactor,
    );

    const { width: layerWidth, height: layerHeight } = this._activeLayer;
    const xStart = Math.max(0, Math.min(xTL, xTR, xBL, xBR));
    const yStart = Math.max(0, Math.min(yTL, yTR, yBL, yBR));
    const xEnd = Math.min(layerWidth, Math.max(xTL, xTR, xBL, xBR));
    const yEnd = Math.min(layerHeight, Math.max(yTL, yTR, yBL, yBR));

    // Update the region.
    for (let yScreen = yStart; yScreen < yEnd; yScreen += 1) {
      for (let xScreen = xStart; xScreen < xEnd; xScreen += 1) {
        const [xSprite, ySprite] = mapCoordinates(
          [xScreen, yScreen],
          [width, height],
          [withHorizontalFlip, withVerticalFlip],
          [xOrigin, yOrigin],
          [x, y],
          rotation,
          scaleFactor,
        );

        let color = sample(data, width, xSprite, ySprite) ?? 0;
        const colorIsTransparent = this.isTransparent(color);

        if (withTransparency) {
          const currentColor = this._activeLayer.getPixel(xScreen, yScreen);
          color =
            !this._ignoreTransparency && colorIsTransparent
              ? currentColor
              : this._mixColors(currentColor, color);
        }

        if (this._ignoreTransparency || !colorIsTransparent) {
          this._activeLayer.putPixel(xScreen, yScreen, color);
        }
      }
    }

    return [xStart, yStart, xEnd, yEnd];
  }

  getMap(fpgId: number, mapId: number): DivMap {
    // TODO: Validate fpgId and mapId.
    const map =
      fpgId === 0 && mapId >= this._noFpgMapIdOffset
        ? this._loadedMaps.get(mapId)
        : this._loadedFpgs.get(fpgId).map(mapId);
    return map;
  }

  isTransparent(colorIndex: number): boolean {
    return colorIndex === this._transparentIndex;
  }

  _mixColors(colorAIndex: number, colorBIndex: number): number {
    const [rA, gA, bA] = this.palette.color(colorAIndex);
    const [rB, gB, bB] = this.palette.color(colorBIndex);
    const mixedComponents = [
      Math.floor((rA + rB) / 2),
      Math.floor((gA + gB) / 2),
      Math.floor((bA + bB) / 2),
    ] as Color;
    return this._findClosest(mixedComponents);
  }

  _findClosest([r, g, b]: Color): number {
    let closestColorIndex = 0;
    let closestColorDistance = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < this.palette.size; i += 1) {
      const [rPalette, gPalette, bPalette] = this.palette.color(i);
      const distance = Math.sqrt(
        Math.pow(r - rPalette, 2) +
          Math.pow(g - gPalette, 2) +
          Math.pow(b - bPalette, 2),
      );
      if (distance < closestColorDistance) {
        closestColorIndex = i;
        closestColorDistance = distance;
      }
    }
    return closestColorIndex;
  }

  _initShaders() {
    const gl = this._gl;
    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const ps = createShader(gl, gl.FRAGMENT_SHADER, psSource);
    this._gpuProgram = createProgram(gl, vs, ps);
    gl.useProgram(this._gpuProgram);
  }

  _loadScreenGeometry() {
    const gl = this._gl;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this._screenCorners, gl.STATIC_DRAW);
  }

  _configureScreenVao() {
    const gl = this._gl;
    const program = this._gpuProgram;
    const location = gl.getAttribLocation(program, "a_position");
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  }

  _configureScreenTexture() {
    const gl = this._gl;
    const program = this._gpuProgram;
    const screenLocation = gl.getUniformLocation(program, "u_screen");
    gl.uniform1i(screenLocation, 0);
    gl.activeTexture(gl.TEXTURE0);
    const frameBufferTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, frameBufferTexture);
    this._configureTextureForIntegerIndexing();
  }

  _configurePaletteTexture() {
    const gl = this._gl;
    const program = this._gpuProgram;
    const paletteLocation = gl.getUniformLocation(program, "u_palette");
    gl.uniform1i(paletteLocation, 1);
    gl.activeTexture(gl.TEXTURE1);
    const paletteTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, paletteTexture);
    this._configureTextureForIntegerIndexing();
  }

  _configureTextureForIntegerIndexing() {
    const gl = this._gl;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  }

  _sendFrameBuffer() {
    const gl = this._gl;
    const { width, height } = this._bgLayer;
    const buffer = this._combineLayers();
    gl.activeTexture(gl.TEXTURE0);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.ALPHA,
      width,
      height,
      0,
      gl.ALPHA,
      gl.UNSIGNED_BYTE,
      buffer,
    );
  }

  _combineLayers(): Uint8Array {
    const { buffer: bgBuffer } = this._bgLayer;
    const { buffer: fgBuffer } = this._fgLayer;
    const combined = fgBuffer.map((fgPixel, idx) =>
      this.isTransparent(fgPixel) ? bgBuffer[idx] : fgPixel,
    );
    return combined;
  }

  _sendPalette() {
    const gl = this._gl;
    const { size, buffer } = this.palette;
    gl.activeTexture(gl.TEXTURE1);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGB,
      size,
      1,
      0,
      gl.RGB,
      gl.UNSIGNED_BYTE,
      buffer,
    );
  }

  _drawScreen() {
    this._gl.drawArrays(this._gl.TRIANGLES, 0, this._screenGeometryVertexCount);
  }

  _flush() {
    // XXX: Not relying on RAF requires a flush call to draw immediately.
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices#use_webgl.flush_when_not_using_requestanimationframe
    this._gl.flush();
  }

  _nextFpgId() {
    return this._loadedFpgs.size;
  }

  _nextMapId() {
    return this._noFpgMapIdOffset + this._loadedMaps.size;
  }

  _drawProcesses(runtime: Runtime) {
    this._fgLayer.clear();
    const browser = runtime.getMemoryBrowser();
    const aliveProcesses = runtime.aliveProcesses;
    // TODO: Ensure more positive z comes first in the array.
    const zSortedProcesses = aliveProcesses.sort(
      (a, b) =>
        browser.process({ id: b.processId }).local("z").value -
        browser.process({ id: a.processId }).local("z").value,
    );
    zSortedProcesses.forEach((process) => {
      const processView = browser.process({ id: process.processId });
      const processBox = this._drawProcess(processView);
      processView.local("reserved.box_x0").value = processBox[0];
      processView.local("reserved.box_y0").value = processBox[1];
      processView.local("reserved.box_x1").value = processBox[2];
      processView.local("reserved.box_y1").value = processBox[3];
    });
  }

  _drawProcess(process: ProcessView): [number, number, number, number] {
    const mapId = process.local("graph").value;
    if (mapId === 0) {
      return [0, 0, 0, 0];
    }

    const fpgId = process.local("file").value;
    const map = this.getMap(fpgId, mapId);
    const { data, width, height } = map;
    const { x: xOrigin, y: yOrigin } =
      map.controlPointCount > 0 ? map.controlPoint(0) : map.center;

    const x = process.local("x").value;
    const y = process.local("y").value;
    const angle = process.local("angle").value;
    const size = process.local("size").value;
    const flags = process.local("flags").value;
    const region = process.local("region").value;

    this.setActiveLayer("fg");
    this.enableTransparency();
    return this.putPixelData(
      data,
      width,
      height,
      x,
      y,
      xOrigin,
      yOrigin,
      angle,
      size,
      flags,
      region,
    );
  }

  setActiveLayer(layer: "bg" | "fg") {
    this._activeLayer = layer === "bg" ? this._bgLayer : this._fgLayer;
  }
}

function sample(
  data: Uint8Array,
  width: number,
  x: number,
  y: number,
): number | null {
  // Invalid cases are signaled with null.
  let idx: number;
  if (
    x < 0 ||
    y < 0 ||
    width <= 0 ||
    x >= width ||
    (idx = y * width + x) < 0 || // XXX: Notice the assignment. Not proud of this but shorter.
    idx >= data.length
  ) {
    return null;
  }
  return data[idx];
}

function flipBufferY(pixels: Uint8Array, width: number, height: number) {
  const rowSize = width * 4; // 4 bytes per pixel (RGBA)
  const halfHeight = Math.floor(height / 2);
  const tempRow = new Uint8Array(rowSize); // Temporary buffer for one row

  for (let y = 0; y < halfHeight; y++) {
    const topRowStart = y * rowSize;
    const bottomRowStart = (height - y - 1) * rowSize;

    // Copy the top row into the temporary buffer
    tempRow.set(pixels.subarray(topRowStart, topRowStart + rowSize));

    // Copy the bottom row into the top row
    pixels.set(
      pixels.subarray(bottomRowStart, bottomRowStart + rowSize),
      topRowStart,
    );

    // Copy the temporary buffer (original top row) into the bottom row
    pixels.set(tempRow, bottomRowStart);
  }

  return pixels;
}

export { Div2VideoSystem as VideoSystem };
export default WebGL2IndexedScreenVideoSystem;
