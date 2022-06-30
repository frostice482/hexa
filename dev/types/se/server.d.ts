import { BeforeChatEvent, Player, WorldInitializeEvent } from "mojang-minecraft";
export default class server {
    #private;
    static get interval(): typeof interval;
    static get timeout(): typeof timeout;
    static get vThread(): typeof vThread;
    static get ev(): {
        beforeChat: {
            subscribe: (callback: (eventData: BeforeChatEvent, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: BeforeChatEvent, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
        playerJoin: {
            subscribe: (callback: (eventData: Player, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: Player, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
        playerLoad: {
            subscribe: (callback: (eventData: Player, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: Player, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
        initialize: {
            subscribe: (callback: (eventData: WorldInitializeEvent, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: WorldInitializeEvent, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
        postInitialize: {
            subscribe: (callback: (eventData: void, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: void, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
    };
    static get events(): {
        beforeChat: {
            subscribe: (callback: (eventData: BeforeChatEvent, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: BeforeChatEvent, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
        playerJoin: {
            subscribe: (callback: (eventData: Player, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: Player, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
        playerLoad: {
            subscribe: (callback: (eventData: Player, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: Player, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
        initialize: {
            subscribe: (callback: (eventData: WorldInitializeEvent, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: WorldInitializeEvent, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
        postInitialize: {
            subscribe: (callback: (eventData: void, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: void, control: import("./evmngr.js").eventControl) => void) => boolean;
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
