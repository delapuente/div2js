declare enum ProcessStatus {
    UNINITIALIZED = 0,
    DEAD = 1,
    ALIVE = 2,
    SLEPT = 3,
    FROZEN = 4
}
interface Process {
    run(): Baton;
    processId: number;
    processType?: number;
    status: ProcessStatus;
    programIndex: number;
}
/**
 * The scheduler encapsulates the responsibilty of executing processes. It does
 * not know about painting the screen, playing audio, or anything like that.
 * When processes are done executing, it publishes an event to notify the
 * runtime.
 */
declare class Scheduler<P extends Process> {
    onfinished?: CallableFunction;
    onyield?: CallableFunction;
    onstepstart?: CallableFunction;
    onstepend?: CallableFunction;
    get currentProcess(): P;
    get aliveProcesses(): Array<P>;
    private _processList;
    private _isRunning;
    private _nextAnimationFrame;
    private _current;
    add(process: P): void;
    deleteCurrent(): void;
    reset(): void;
    run(): void;
    stop(): void;
    private _call;
    private _end;
    private _removeDeadProcess;
    private _scheduleStep;
    private _startOver;
    private _step;
    private _yield;
}
declare class Baton implements Record<string, unknown> {
    [x: string]: unknown;
    type: string;
    constructor(type: string, data?: Record<string, unknown>);
}
export { Scheduler, Baton, Process, ProcessStatus };
