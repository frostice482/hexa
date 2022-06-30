import { Player } from "mojang-minecraft";
export default class chat {
    static get ev(): {
        nicknameChange: {
            subscribe: (callback: (eventData: nicknameChangeEvent, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: nicknameChangeEvent, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
        chat: {
            subscribe: (callback: (eventData: chatEvent, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: chatEvent, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
    };
    static get events(): {
        nicknameChange: {
            subscribe: (callback: (eventData: nicknameChangeEvent, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: nicknameChangeEvent, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
        chat: {
            subscribe: (callback: (eventData: chatEvent, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: chatEvent, control: import("./evmngr.js").eventControl) => void) => boolean;
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
