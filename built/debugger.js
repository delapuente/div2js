function DebugSession(memBrowser) {
    this._browser = memBrowser;
}
DebugSession.prototype = {
    constructor: DebugSession,
    get global() {
        return this._browser.global.bind(this._browser);
    },
    get process() {
        return this._browser.process.bind(this._browser);
    }
};
function debug(runtime) {
    return new DebugSession(runtime.getMemoryBrowser());
}
export { DebugSession, debug };
