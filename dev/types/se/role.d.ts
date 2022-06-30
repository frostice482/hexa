import { Player } from "mojang-minecraft";
declare const auth: unique symbol;
export default class role {
    static get ev(): {
        format: {
            subscribe: (callback: (eventData: formatEvd, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: formatEvd, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
    };
    static get events(): {
        format: {
            subscribe: (callback: (eventData: formatEvd, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: formatEvd, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
    };
    static get group(): typeof roleGroup;
    static readonly format: (plr: Player, formatType?: 'message' | 'nametag', message?: string) => string;
    static get config(): {
        applyRoleToNametag: boolean;
        nametagUpdateInterval: number;
        nametagFormat: string;
        messageFormat: string;
        roleGroupStyleSeparator: string;
    };
    protected constructor();
}
declare let config: {
    applyRoleToNametag: boolean;
    nametagUpdateInterval: number;
    nametagFormat: string;
    messageFormat: string;
    roleGroupStyleSeparator: string;
};
declare class roleGroupStyle {
    #private;
    [Symbol.iterator]: () => Generator<groupStyleData, void, undefined>;
    readonly add: (tag: string, style: string) => this;
    readonly addFront: (tag: string, style: string) => this;
    readonly addAt: (index: number, tag: string, style: string) => this;
    readonly remove: () => groupStyleData;
    readonly removeFront: () => groupStyleData;
    readonly removeAt: (index: number) => groupStyleData;
    readonly getAt: (index: number) => groupStyleData;
    get length(): number;
    get getGroupStyle(): (target: string[] | Player) => string;
    constructor(key: typeof auth, group: roleGroup);
}
declare class roleGroup {
    static readonly 'get': (id: string) => roleGroup;
    static readonly exist: (id: string) => boolean;
    static readonly getList: () => IterableIterator<roleGroup>;
    static readonly delete: (id: string) => boolean;
    static readonly getGroupStyles: (target: string[] | Player) => string[];
    static readonly fromJSON: (json: groupJSONData) => roleGroup;
    constructor(id: string, pos?: number, display?: roleGroup['display'], defaultStyle?: string);
    readonly id: string;
    pos: number;
    display: 'always' | 'auto' | 'never';
    defaultStyle: string;
    readonly styles: roleGroupStyle;
    readonly toJSON: () => groupJSONData;
    readonly getStyle: (target: string[] | Player) => string;
}
declare type groupStyleData = [tag: string, style: string];
declare type groupJSONData = {
    readonly id: string;
    pos: number;
    display: 'always' | 'auto' | 'never';
    defaultStyle: string;
    styles: groupStyleData[];
};
declare type formatVariables = {
    [k: string]: any;
    name: string;
    message?: string;
    role: string;
    level: number;
    score: (obj: string) => number;
};
declare type formatEvd = {
    readonly plr: Player;
    formatType: 'message' | 'nametag';
    format: string;
    readonly variables: formatVariables;
};
export declare type saveData = {
    groups: groupJSONData[];
    config: typeof config;
};
export {};
