(function (rt) {
    'use strict';
    /* Here comes the offset declarations */
    function __yieldFrame(npc, completion) {
        return new rt.Baton('frame', { npc: npc, completion: completion });
    }
    function __yieldDebug(npc) {
        return new rt.Baton('debug', { npc: npc });
    }
    function __yieldNewProcess(npc, processName, args) {
        return new rt.Baton('newprocess', {
            npc: npc,
            processName: processName,
            args: args
        });
    }
    function __yieldCallFunction(npc, functionName, args) {
        return new rt.Baton('call', {
            npc: npc,
            functionName: functionName,
            args: args
        });
    }
    var __yieldEnd = new rt.Baton('end');
    return {};
});
