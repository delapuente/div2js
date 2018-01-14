import * as memory from './memory';
import * as scheduler from './scheduler';
var Scheduler = scheduler.Scheduler;
var MemoryManager = memory.MemoryManager;
function Environment() {
    this.video = {
        width: 320,
        height: 200
    };
}
//TODO: Runtime should be passed with a light version of the memory map,
// enough to be able of allocating the needed memory.
function Runtime(processMap, memorySymbols) {
    this._ondebug = null;
    this._onfinished = null;
    this._systems = [];
    this._memoryManager = new MemoryManager(memorySymbols);
    this._environment = new Environment();
    var memory = this._memoryManager.getMemory();
    this._scheduler = new Scheduler(memory, processMap, {
        onyield: this._schedule.bind(this),
        //XXX: Update means after all processes have run entirely
        onupdate: this._runSystems.bind(this)
    });
}
Runtime.prototype = {
    constructor: Runtime,
    registerSystem: function (system) {
        system.initialize();
        this._systems.push(system);
    },
    getMemoryBrowser: function () {
        return this._memoryManager.getBrowser();
    },
    set onfinished(callback) {
        this._onfinished = callback;
        if (this._scheduler instanceof scheduler.Scheduler) {
            this._scheduler.onfinished = this._onfinished.bind(this);
        }
    },
    get onfinished() { return this._onfinished; },
    set ondebug(callback) {
        this._ondebug = callback;
        if (this._scheduler instanceof scheduler.Scheduler) {
            this._scheduler.ondebug = this._ondebug;
        }
    },
    get ondebug() { return this._ondebug; },
    run: function () {
        this._scheduler.reset();
        this._memoryManager.reset();
        var id = this._memoryManager.allocateProcess();
        this._scheduler.addProgram(id);
        this._scheduler.run();
    },
    _runSystems: function () {
        var memoryBrowser = this.getMemoryBrowser();
        var environment = this._environment;
        this._systems.forEach(function (system) {
            system.run(memoryBrowser, environment);
        });
    },
    _schedule: function (baton) {
        var name = '_' + baton.type;
        if (!(name in this)) {
            throw Error('Unknown execution message: ' + baton.type);
        }
        return this[name](baton);
    },
    _debug: function (baton) {
        this._scheduler.onpause = this._startDebug.bind(this);
        this._scheduler.pause();
    },
    _startDebug: function () {
        //XXX: Notice resume is run right now.
        this._ondebug({
            resume: this._scheduler.run.bind(this._scheduler),
            stop: this._scheduler.stop.bind(this._scheduler)
        });
    },
    _newprocess: function (baton) {
        var name = baton.processName;
        var id = this._memoryManager.allocateProcess();
        if (!id) {
            throw new Error('Max number of process reached!');
        }
        this._scheduler.addProcess(name, id);
    },
    _call: function (baton) {
    },
    _frame: function (baton) {
    },
    // TODO: Consider passing the id through the baton
    _end: function (baton) {
        var currentProcessId = this._scheduler.currentExecution.id;
        this._memoryManager.freeProcess(currentProcessId);
        this._scheduler.deleteCurrent();
    }
};
var Baton = scheduler.Baton;
export { Runtime, Baton };
