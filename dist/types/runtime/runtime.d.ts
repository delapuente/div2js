import { MemoryManager } from "./memory";
import { Scheduler, Baton, Process } from "./scheduler";
import { DivError } from "../errors";
import { VideoSystem } from "../systems/video/wgl2idx";
import { Div2FileSystem } from "../systems/files/div2FileSystem";
import { MemoryBrowser } from "../memoryBrowser/mapper";
type SystemKind = "video" | "files";
declare class Environment {
    video: {
        width: number;
        height: number;
    };
    constructor();
}
interface System {
    initialize(memoryBrowser: MemoryBrowser): void;
    getComponent?<T>(process: Process, componentType: new (...args: unknown[]) => T): T;
    run?(runtime: Runtime): void;
}
interface Component {
    process: Process;
}
type GetSystemReturnType<K> = K extends "video" ? VideoSystem : K extends "files" ? Div2FileSystem : never;
declare class Runtime {
    onerror?: (error: DivError) => void;
    ondebug?: CallableFunction;
    _onfinished?: CallableFunction;
    _systems: System[];
    _systemMap: {
        video?: VideoSystem;
        files?: Div2FileSystem;
    };
    _functions: {
        [key: string]: CallableFunction;
    };
    _memoryManager: MemoryManager;
    environment: Environment;
    _pmap: any;
    _mem: any;
    _scheduler: Scheduler<Process>;
    constructor(processMap: any, memoryManager: MemoryManager, scheduler: Scheduler<Process>);
    addProcess(name: string, base: number, args?: number[]): void;
    addProgram(base: number): void;
    registerSystem(system: System, name: string): void;
    registerFunction(fn: CallableFunction, name: string): void;
    getSystem<T extends SystemKind>(name: T): GetSystemReturnType<T>;
    getMemoryBrowser(): MemoryBrowser;
    get currentProcess(): Process;
    get aliveProcesses(): Process[];
    set onfinished(callback: CallableFunction);
    get onfinished(): CallableFunction;
    resume(): void;
    start(): void;
    debug(): void;
    newProcess(processName: string, args: number[], process: any): void;
    call(functionName: string, args: unknown[], process: any): void;
    frame(): void;
    end(): void;
    _runSystems(): void;
    _handle(baton: Baton, originator: Process): any;
    _debug(): void;
    _newProcess(baton: Baton, originator: Process): void;
    _call(baton: any, process: any): void;
    _frame(): void;
    _end(): void;
}
export { Runtime, Baton, System, Component };
