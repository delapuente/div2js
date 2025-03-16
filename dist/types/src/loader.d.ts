import * as runtime from "./runtime/runtime";
interface LinkerOptions {
    canvas: HTMLCanvasElement;
    rootUrl: string;
}
declare function load(objText: string, options: LinkerOptions): Promise<runtime.Runtime>;
export { load };
