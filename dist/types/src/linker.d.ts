import * as runtime from "./runtime/runtime";
interface LinkerOptions {
    canvas: HTMLCanvasElement;
    rootUrl: string;
}
declare function link(objText: string, options: LinkerOptions): Promise<runtime.Runtime>;
export { link };
