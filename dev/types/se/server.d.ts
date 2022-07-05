import { BeforeChatEvent, Player, WorldInitializeEvent } from "mojang-minecraft";
export default class server {
    #private;
    static get interval(): typeof interval;
    static get timeout(): typeof timeout;
    static get vThread(): typeof vThread;
    static get ev(): {
        beforeChat: {
            subscribe: <callback extends (evd: BeforeChatEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback, priority?: number) => callback;
            unsubscribe: <callback_1 extends (evd: BeforeChatEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback_1) => boolean;
        };
        playerJoin: {
            subscribe: <callback_2 extends (evd: Player, control: import("./evmngr.js").eventControl) => any>(callback: callback_2, priority?: number) => callback_2;
            unsubscribe: <callback_3 extends (evd: Player, control: import("./evmngr.js").eventControl) => any>(callback: callback_3) => boolean;
        };
        playerLoad: {
            subscribe: <callback_4 extends (evd: Player, control: import("./evmngr.js").eventControl) => any>(callback: callback_4, priority?: number) => callback_4;
            unsubscribe: <callback_5 extends (evd: Player, control: import("./evmngr.js").eventControl) => any>(callback: callback_5) => boolean;
        };
        initialize: {
            subscribe: <callback_6 extends (evd: WorldInitializeEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback_6, priority?: number) => callback_6;
            unsubscribe: <callback_7 extends (evd: WorldInitializeEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback_7) => boolean;
        };
        postInitialize: {
            subscribe: <callback_8 extends (evd: void, control: import("./evmngr.js").eventControl) => any>(callback: callback_8, priority?: number) => callback_8;
            unsubscribe: <callback_9 extends (evd: void, control: import("./evmngr.js").eventControl) => any>(callback: callback_9) => boolean;
        };
    };
    static get events(): {
        beforeChat: {
            subscribe: <callback extends (evd: BeforeChatEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback, priority?: number) => callback;
            unsubscribe: <callback_1 extends (evd: BeforeChatEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback_1) => boolean;
        };
        playerJoin: {
            subscribe: <callback_2 extends (evd: Player, control: import("./evmngr.js").eventControl) => any>(callback: callback_2, priority?: number) => callback_2;
            unsubscribe: <callback_3 extends (evd: Player, control: import("./evmngr.js").eventControl) => any>(callback: callback_3) => boolean;
        };
        playerLoad: {
            subscribe: <callback_4 extends (evd: Player, control: import("./evmngr.js").eventControl) => any>(callback: callback_4, priority?: number) => callback_4;
            unsubscribe: <callback_5 extends (evd: Player, control: import("./evmngr.js").eventControl) => any>(callback: callback_5) => boolean;
        };
        initialize: {
            subscribe: <callback_6 extends (evd: WorldInitializeEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback_6, priority?: number) => callback_6;
            unsubscribe: <callback_7 extends (evd: WorldInitializeEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback_7) => boolean;
        };
        postInitialize: {
            subscribe: <callback_8 extends (evd: void, control: import("./evmngr.js").eventControl) => any>(callback: callback_8, priority?: number) => callback_8;
            unsubscribe: <callback_9 extends (evd: void, control: import("./evmngr.js").eventControl) => any>(callback: callback_9) => boolean;
        };
    };
    static get ticker(): {
        3: (...args: [] | [number]) => IteratorResult<any, never>;
        2: (...args: [] | [number]) => IteratorResult<any, never>;
        1: () => void;
        0: () => void;
        level: 0 | 2 | 1 | 3;
        readonly time: number;
    };
    static time: number;
    static readonly start: () => Promise<void>;
    static nextTick: Promise<unknown>;
    static readonly waitFor: (tick: number) => Promise<unknown>;
    protected constructor();
}
declare class timeout {
    fn: (delay: number) => void;
    readonly name: string;
    call: number;
    creation: number;
    tolerate: number;
    isClosed: boolean;
    close: () => any;
    constructor(fn: timeout['fn'], ms: number, tolerate?: number);
}
export declare class interval {
    fn: (delay: number) => void;
    readonly name: string;
    nextCall: number;
    lastCall: number;
    interval: number;
    maxCallPerTick: number;
    tolerate: number;
    close: () => any;
    constructor(fn: timeout['fn'], ms: number, tolerate?: number, maxCallPerTick?: number);
}
declare type vThreadAwaitResponse<T extends Promise<any>> = {
    onResolve?: (v: Awaited<T>) => void;
    onReject?: (v: Awaited<T>) => void;
    onRejectThrow?: boolean;
};
declare class vThread {
    fn: Generator<any, any, any>;
    sleepUntil: number;
    readonly name: string;
    readonly sleep: (duration: number) => this;
    readonly sleepAwait: <T extends Promise<any>>(promise: T, response?: vThreadAwaitResponse<T>) => void;
    readonly close: () => any;
    constructor(fn: (v: vThread) => vThread['fn']);
}
export {};
