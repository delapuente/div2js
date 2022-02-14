import * as runtime from './runtime/runtime';
import * as systems from './systems/systems';

function load (objText, options = { rootUrl: '' }) {
  // tslint:disable-next-line:no-eval
  let unit = eval(objText)(runtime, systems);
  let processMap = unit.pmap;
  let memoryMap = unit.mmap;
  let program = new runtime.Runtime(processMap, memoryMap);
  // TODO: Let's think how to register new systems in a configurable way
  registerRenderSystem(program);
  // TODO: Let's also think how to configure the systems in a configurable way
  registerFileSystem(program, options.rootUrl);
  return Promise.resolve(program);
}

function registerRenderSystem (program) {
  // TODO: The screen should be passed as an option
  if (window && window.document) {
    if (!document.querySelector('#div-screen')) {
      const canvas = document.createElement('CANVAS');
      canvas.id = 'div-screen';
      canvas.style.imageRendering = 'pixelated';
      document.body.appendChild(canvas);
    }
    const canvas = document.querySelector('#div-screen');
    program.registerSystem(new systems.DefaultRender(canvas), 'video');
  }
}

function registerFileSystem (program, rootUrl = '') {
  program.registerSystem(
    new systems.DefaultFileSystem({
      rootUrl
    }), 'files'
  );
}

export {
  load
};
