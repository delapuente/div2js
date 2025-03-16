import * as runtime from "./runtime/runtime";
import * as systems from "./systems/systems";
import * as builtins from "./builtins";
import { MemoryManager } from "./runtime/memory";
import { Scheduler } from "./runtime/scheduler";

function load(objText: string, options): Promise<runtime.Runtime> {
  // tslint:disable-next-line:no-eval
  const unit = eval(objText)(runtime, systems);
  const processMap = unit.pmap;
  const memoryMap = unit.mmap;
  const memoryManager = new MemoryManager(memoryMap);
  const scheduler = new Scheduler();
  const program = new runtime.Runtime(processMap, memoryManager, scheduler);
  // TODO: Let's think how to register new systems in a configurable way
  registerRenderSystem(program);
  // TODO: Let's also think how to configure the systems in a configurable way
  registerFileSystem(program, options.rootUrl);
  // TODO: Let's also think how to add new functions in a configurable way
  registerFunctions(program, builtins);
  return Promise.resolve(program);
}

function registerRenderSystem(program: runtime.Runtime) {
  // TODO: The screen should be passed as an option
  if (window && window.document) {
    if (!document.querySelector("#div-screen")) {
      const canvas = document.createElement("CANVAS");
      canvas.id = "div-screen";
      canvas.style.imageRendering = "pixelated";
      canvas.style.cursor = "none";
      document.body.appendChild(canvas);
    }
    // TODO: Move this to its own system registering and rethink the interdependencies.
    const canvas = document.querySelector("#div-screen") as HTMLCanvasElement;
    program.registerInputSystem(new systems.DefaultInput(320, 200, canvas));
    program.registerVideoSystem(new systems.DefaultRender(canvas));
  }
}

function registerFileSystem(program: runtime.Runtime, rootUrl: string) {
  program.registerFileSystem(
    new systems.DefaultFileSystem({
      rootUrl,
    }),
  );
}

function registerFunctions(program, builtins) {
  const functions = Object.keys(builtins);
  for (const functionName of functions) {
    program.registerFunction(builtins[functionName], functionName);
  }
}

export { load };
