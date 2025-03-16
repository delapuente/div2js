import * as runtime from "./runtime/runtime";
declare function load(objText: string, options: any): Promise<runtime.Runtime>;
export { load };
