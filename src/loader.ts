import * as runtime from "./runtime/runtime";
import * as systems from "./systems/systems";
import * as builtins from "./builtins";
import { MemoryManager } from "./runtime/memory";

function load(objText, options = { rootUrl: "" }) {
  // tslint:disable-next-line:no-eval
  const unit = eval(objText)(runtime, systems);
  const processMap = unit.pmap;
  const memoryMap = unit.mmap;
  const memoryManager = new MemoryManager(memoryMap);
  const program = new runtime.Runtime(processMap, memoryManager);
  // TODO: Let's think how to register new systems in a configurable way
  registerRenderSystem(program);
  // TODO: Let's also think how to configure the systems in a configurable way
  registerFileSystem(program, options.rootUrl);
  // TODO: Let's also think how to add new functions in a configurable way
  registerFunctions(program, builtins);
  return Promise.resolve(program);
}

function registerRenderSystem(program) {
  // TODO: The screen should be passed as an option
  if (window && window.document) {
    if (!document.querySelector("#div-screen")) {
      const canvas = document.createElement("CANVAS");
      canvas.id = "div-screen";
      canvas.style.imageRendering = "pixelated";
      document.body.appendChild(canvas);
    }
    const canvas = document.querySelector("#div-screen");
    program.registerSystem(new systems.DefaultRender(canvas), "video");
  }
}

function registerFileSystem(program, rootUrl = "") {
  program.registerSystem(
    new systems.DefaultFileSystem({
      rootUrl,
    }),
    "files"
  );
}

function registerFunctions(program, builtins) {
  const functions = Object.keys(builtins);
  for (const functionName of functions) {
    program.registerFunction(builtins[functionName], functionName);
  }
}

export { load };
