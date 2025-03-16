import { Runtime } from "../../../runtime/runtime";
import Fpg from "./fpg";
import IndexedGraphic from "./indexedGraphic";
import Palette from "./palette";
import { Div2VideoSystem } from "../div2VideoSystem";
import DivMap from "./map";
import { MemoryBrowser } from "../../../memoryBrowser/mapper";
import { GeometryData } from "./geometry";
import { Process } from "../../../runtime/scheduler";
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
declare class WebGL2IndexedScreenVideoSystem implements Div2VideoSystem {
    private readonly _bgLayer;
    private readonly _fgLayer;
    readonly _noFpgMapIdOffset = 1000;
    readonly _transparentIndex: number;
    private _screenCorners;
    private _screenGeometryVertexCount;
    private _gl;
    private _gpuProgram;
    private _framebuffer;
    private readonly _loadedFpgs;
    private readonly _loadedMaps;
    private _memoryBrowser;
    private _activeLayer;
    private _activeRegion;
    palette: Palette;
    private _isPaletteLoaded;
    private _ignoreTransparency;
    constructor(canvas: any, _bgLayer?: IndexedGraphic, _fgLayer?: IndexedGraphic);
    setActiveRegion(region: number): void;
    isPaletteLoaded(): boolean;
    initialize(memoryBrowser: MemoryBrowser): void;
    getComponent<T>(process: Process, componentType: new (...args: unknown[]) => T): T;
    get framebuffer(): Uint8Array;
    get screenWidth(): number;
    get screenHeight(): number;
    onStepEnd(runtime: Runtime): void;
    setViewportResolution(width: any, height: any): void;
    setPalette(palette: Palette): void;
    enableTransparency(): void;
    disableTransparency(): void;
    loadFpg(fpg: Fpg): number;
    loadMap(map: DivMap): number;
    putPixel(x: number, y: number, colorIndex: number): void;
    putPixelData(data: Uint8Array, transform: GeometryData, alphaBlend: boolean): [number, number, number, number];
    getMap(fpgId: number, mapId: number): DivMap;
    isTransparent(colorIndex: number): boolean;
    _mixColors(colorAIndex: number, colorBIndex: number): number;
    _findClosest([r, g, b]: Color): number;
    _initShaders(): void;
    _loadScreenGeometry(): void;
    _configureScreenVao(): void;
    _configureScreenTexture(): void;
    _configurePaletteTexture(): void;
    _configureTextureForIntegerIndexing(): void;
    _sendFrameBuffer(): void;
    _combineLayers(): Uint8Array;
    _sendPalette(): void;
    _drawScreen(): void;
    _flush(): void;
    _nextFpgId(): number;
    _nextMapId(): number;
    _drawProcesses(runtime: Runtime): void;
    _drawProcess(process: Process): [number, number, number, number];
    setActiveLayer(layer: "bg" | "fg"): void;
}
export { Div2VideoSystem as VideoSystem };
export default WebGL2IndexedScreenVideoSystem;
