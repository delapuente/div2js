import * as dbgr from "../../src/debugger";
declare function link(programUrl: any): Promise<import("../../src/runtime/runtime").Runtime>;
declare function withDebugSession(callback: (session: dbgr.DebugSession) => void): () => void;
declare function autoResume(callback: any): () => void;
declare class MemoryBrowserMock {
    private readonly _globalStore;
    constructor();
    global(path: string): {
        value: number;
    };
}
declare class RuntimeMock {
    private readonly _memoryBrowser;
    constructor();
    getMemoryBrowser(): MemoryBrowserMock;
}
export { link, withDebugSession, autoResume, RuntimeMock };
