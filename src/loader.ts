import * as runtime from './runtime/runtime';
import * as systems from './systems/systems';

function load (objText) {
  // tslint:disable-next-line:no-eval
  let unit = eval(objText)(runtime, systems);
  let processMap = unit.pmap;
  let memoryMap = unit.mmap;
  let program = new runtime.Runtime(processMap, memoryMap);
  // TODO: Let's think how to register new systems in a configurable way
  registerRenderSystem(program);
  return Promise.resolve(program);
}

function registerRenderSystem (program) {
  if (window && window.document) {
    if (!document.querySelector('#div-monitor')) {
      const canvas = document.createElement('CANVAS');
      canvas.id = 'div-monitor';
      canvas.style.imageRendering = 'pixelated';
      document.body.appendChild(canvas);
    }
    const canvas = document.querySelector('#div-monitor');
    program.registerSystem(new systems.DefaultRender(canvas));
  }
}

export {
  load
};
