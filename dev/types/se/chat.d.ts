import { Player } from "mojang-minecraft";
export default class chat {
    static get ev(): {
        nicknameChange: {
            subscribe: <callback extends (evd: nicknameChangeEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback, priority?: number) => callback;
            unsubscribe: <callback_1 extends (evd: nicknameChangeEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback_1) => boolean;
        };
        chat: {
            subscribe: <callback_2 extends (evd: chatEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback_2, priority?: number) => callback_2;
            unsubscribe: <callback_3 extends (evd: chatEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback_3) => boolean;
        };
    };
    static get events(): {
        nicknameChange: {
            subscribe: <callback extends (evd: nicknameChangeEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback, priority?: number) => callback;
            unsubscribe: <callback_1 extends (evd: nicknameChangeEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback_1) => boolean;
        };
        chat: {
            subscribe: <callback_2 extends (evd: chatEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback_2, priority?: number) => callback_2;
            unsubscribe: <callback_3 extends (evd: chatEvent, control: import("./evmngr.js").eventControl) => any>(callback: callback_3) => boolean;
        };
    };
    static get group(): typeof chatGroup;
    static readonly send: (plr: Player, message: string) => void;
    protected constructor();
}
declare type chatGroupTagFilter = {
    [k in 'all' | 'any' | 'none']?: chatGroupTagFilter;
} | string[];
declare type messageCancelLevel = 0 | 1 | 2;
declare type chatGroupJSONData = {
    readonly id: string;
    priority: number;
    tagFilter: chatGroupTagFilter;
    defaultCancelLevel: messageCancelLevel;
    defaultCancelMessage: string;
};
declare class chatGroup {
    static readonly 'get': (id: string) => chatGroup;
    static readonly getList: () => IterableIterator<chatGroup>;
    static readonly exist: (id: string) => boolean;
    static readonly delete: (id: string) => boolean;
    static readonly getGroup: (plr: Player) => chatGroup;
    static readonly getGroupTargets: (group: chatGroup) => Player[];
    static readonly IteratorGetGroupTargets: (group: chatGroup) => Generator<Player, void, unknown>;
    static readonly testGroupFilter: (group: chatGroup, plr: Player) => boolean;
    static readonly fromJSON: (json: chatGroupJSONData) => chatGroup;
    constructor(id: string, priority?: number, tagFilter?: chatGroupTagFilter);
    readonly id: string;
    priority: number;
    tagFilter: chatGroupTagFilter;
    defaultCancelLevel: messageCancelLevel;
    defaultCancelMessage: string;
    readonly getTargets: () => Player[];
    readonly IteratorGetTargets: () => Generator<Player, void, unknown>;
    readonly testFilter: (plr: Player) => boolean;
    readonly toJSON: () => chatGroupJSONData;
}
declare type chatEvent = {
    readonly group: chatGroup;
    readonly sender: Player;
    message: string;
    targets: Iterable<Player>;
    cancelLevel: messageCancelLevel;
    cancelMessage: string;
};
declare type nicknameChangeEvent = {
    readonly plr: Player;
    nickname: string;
    cancel: boolean;
};
export declare type saveData = {
    groups: chatGroupJSONData[];
};
export {};
