import eventManager from "./evmngr.js";
import * as mc from 'mojang-minecraft';
import * as gt from 'mojang-gametest';
import * as mcui from 'mojang-minecraft-ui';
import server from "./server.js";
declare const auth: unique symbol;
export default class bridgeHost {
    static get plugin(): typeof plugin;
}
declare class plugin {
    #private;
    static bridgeInstance: {
        new (key: typeof auth, data: moduleImportData): {
            "__#16@#pli": plugin;
            "__#16@#pliData": pluginImportData;
            "__#16@#data": moduleImportData;
            readonly ev: {
                ready: {
                    subscribe: (callback: (eventData: void, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: void, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                unload: {
                    subscribe: (callback: (eventData: void, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: void, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
            };
            readonly events: {
                ready: {
                    subscribe: (callback: (eventData: void, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: void, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                unload: {
                    subscribe: (callback: (eventData: void, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: void, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
            };
            readonly import: <K extends string>(module: K, defaultVersion?: number | 'latest') => Promise<K extends "Minecraft" | "mc" | "Gametest" | "gt" | "MinecraftUI" | "mcui" | "SE" | "se" ? {
                Minecraft: typeof mc;
                mc: typeof mc;
                Gametest: typeof gt;
                gt: typeof gt;
                MinecraftUI: typeof mcui;
                mcui: typeof mcui;
                SE: {
                    Area: typeof import("./area.js").default;
                    cc: typeof import("./cc.js").default;
                    role: typeof import("./role.js").default;
                    chat: typeof import("./chat.js").default;
                    eventManager: typeof eventManager;
                    execCmd: (command: string, source?: mc.Dimension | "overworld" | "nether" | "end" | "o" | "n" | "e" | mc.Entity, ignoreError?: boolean) => {
                        [k: string]: any;
                        readonly statusCode: number;
                        readonly statusMessage: string;
                    };
                    misc: typeof import("./misc.js");
                    permission: typeof import("./permission.js").default;
                    plr: typeof import("./plr.js").default;
                    scoreboard: typeof import("./scoreboard.js").default;
                    sendChat: typeof import("./sendChat.js");
                    storage: typeof import("./storage.js").default;
                    server: typeof server;
                    TypedValues: typeof import("./typedvalues.js").default;
                };
                se: {
                    Area: typeof import("./area.js").default;
                    cc: typeof import("./cc.js").default;
                    role: typeof import("./role.js").default;
                    chat: typeof import("./chat.js").default;
                    eventManager: typeof eventManager;
                    execCmd: (command: string, source?: mc.Dimension | "overworld" | "nether" | "end" | "o" | "n" | "e" | mc.Entity, ignoreError?: boolean) => {
                        [k: string]: any;
                        readonly statusCode: number;
                        readonly statusMessage: string;
                    };
                    misc: typeof import("./misc.js");
                    permission: typeof import("./permission.js").default;
                    plr: typeof import("./plr.js").default;
                    scoreboard: typeof import("./scoreboard.js").default;
                    sendChat: typeof import("./sendChat.js");
                    storage: typeof import("./storage.js").default;
                    server: typeof server;
                    TypedValues: typeof import("./typedvalues.js").default;
                };
            }[K] : any>;
            readonly importInternal: (module: string) => Promise<any>;
            readonly export: (value: any) => Promise<void>;
        };
    };
    static readonly 'get': (id: string, version?: number | 'latest') => plugin;
    static readonly 'getFamily': (id: string) => pluginFamily;
    static readonly exist: (id: string, version?: number | 'latest') => boolean;
    static readonly getList: () => IterableIterator<[string, pluginFamily]>;
    static readonly delete: (id: string, version?: number | 'latest') => boolean;
    static readonly deleteFamily: (id: string) => boolean;
    static readonly fromJSON: (data: pluginJSONData) => void;
    constructor(id: string, info: pluginInfo, internalModules: Record<string, (bridge: typeof plugin.bridgeInstance.prototype) => any>, config?: pluginConfig);
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly author: string[];
    readonly version: string;
    readonly versionCode: number;
    readonly dependents: Set<plugin>;
    get isExecuted(): boolean;
    readonly execute: (caller?: moduleImportData | null) => Promise<any>;
    get canBeUnloaded(): boolean;
    readonly unload: () => boolean;
}
declare type pluginInfo = {
    name?: string;
    description?: string;
    author?: string[];
    version?: string;
    versionCode?: number;
};
declare type pluginConfig = {
    moduleEntry?: string;
    canBeUnloaded?: boolean;
    executeOnRegister?: boolean;
};
declare type pluginJSONData = pluginInfo & pluginConfig & {
    id: string;
    internalModules: Record<string, string>;
};
declare type pluginFamily = {
    versions: Map<number | 'latest', plugin>;
    latestVersion: number;
    getLoaded: () => plugin;
    commonLoaded: boolean;
    loadedVersion: number;
};
type pluginInstance = ( typeof plugin.bridgeInstance ) extends new(...args: any[]) => infer R ? R : any
export declare type internalModulesList = Record<string, (bridge: pluginInstance) => any>;
declare class commonImportData {
    constructor(id: string);
    readonly id: string;
    readonly parent: unknown;
    readonly promise: Promise<any>;
    readonly res: (v: any) => void;
    readonly rej: (err: any) => void;
}
declare class pluginImportData extends commonImportData {
    constructor(pli: plugin, caller: moduleImportData | null);
    readonly parent: moduleImportData | null;
    readonly pluginStack: plugin[];
    readonly plugin: plugin;
    readonly module: Record<string, moduleImportData>;
}
declare class moduleImportData extends commonImportData {
    constructor(id: string, caller: moduleImportData | pluginImportData);
    readonly parent: moduleImportData | pluginImportData;
    readonly pluginParent: pluginImportData;
    readonly moduleStack: string[];
}
export {};
