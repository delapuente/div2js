import { MemoryBrowser } from "./memoryBrowser/mapper";
import { Runtime } from "./runtime/runtime";
interface ScreenData {
    width: number;
    height: number;
}
declare class DebugSession {
    private _browser;
    private _screenData;
    private _framebuffer;
    constructor(memBrowser: MemoryBrowser, screenData: ScreenData, framebuffer: Uint8Array);
    get global(): any;
    get process(): any;
    get framebuffer(): Uint8Array;
    get screenData(): ScreenData;
}
declare function debug(runtime: Runtime): DebugSession;
export { DebugSession, debug };
