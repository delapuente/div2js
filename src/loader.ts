import * as runtime from "./runtime/runtime";
import * as systems from "./systems/systems";
import * as builtins from "./builtins";
import { MemoryManager } from "./runtime/memory";
import { Scheduler } from "./runtime/scheduler";

interface LinkerOptions {
  canvas: HTMLCanvasElement;
  rootUrl: string;
}

function load(objText: string, options: LinkerOptions): Promise<runtime.Runtime> {
  // tslint:disable-next-line:no-eval
  const unit = eval(objText)(runtime, systems);
  const processMap = unit.pmap;
  const memoryMap = unit.mmap;
  const memoryManager = new MemoryManager(memoryMap);
  const scheduler = new Scheduler();
  const program = new runtime.Runtime(processMap, memoryManager, scheduler);
  
  // TODO: think of providing a way to register and configure systems, and functions.
  program.registerInputSystem(new systems.DefaultInput(320, 200, options.canvas));
  program.registerVideoSystem(new systems.DefaultRender(options.canvas));
  program.registerFileSystem(new systems.DefaultFileSystem(options.rootUrl));
  registerFunctions(program, builtins);
  return Promise.resolve(program);
}

function registerFunctions(program, builtins) {
  const functions = Object.keys(builtins);
  for (const functionName of functions) {
    program.registerFunction(builtins[functionName], functionName);
  }
}

export { load };
