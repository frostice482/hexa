declare const auth: unique symbol;
declare class storage {
    static get instance(): {
        new <T = {}>(id: string): {
            "__#9@#id": string;
            id: string;
            "__#9@#execId": string;
            readonly execId: string;
            "__#9@#saveInfo": saveDataInfo;
            readonly saveInfo: saveDataInfo;
            readonly ev: {
                save: {
                    subscribe: (callback: (eventData: T, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: T, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                postSave: {
                    subscribe: (callback: (eventData: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                load: {
                    subscribe: (callback: (eventData: T, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: T, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                postLoad: {
                    subscribe: (callback: (eventData: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
            };
            readonly events: {
                save: {
                    subscribe: (callback: (eventData: T, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: T, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                postSave: {
                    subscribe: (callback: (eventData: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                load: {
                    subscribe: (callback: (eventData: T, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: T, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                postLoad: {
                    subscribe: (callback: (eventData: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
            };
            readonly save: () => instancePostEventEvd<T>;
            readonly load: () => instancePostEventEvd<T>;
            readonly delete: () => boolean;
            autoload: boolean;
            "__#9@#autosaveInterval": import("./server.js").interval;
            autosaveInterval: number;
        };
        readonly default: {
            "__#10@#uniqueID": string;
            readonly uniqueID: string;
            "__#9@#id": string;
            id: string;
            "__#9@#execId": string;
            readonly execId: string;
            "__#9@#saveInfo": saveDataInfo;
            readonly saveInfo: saveDataInfo;
            readonly ev: {
                save: {
                    subscribe: (callback: (eventData: {
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: {
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                postSave: {
                    subscribe: (callback: (eventData: instancePostEventEvd<{
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }>, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: instancePostEventEvd<{
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }>, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                load: {
                    subscribe: (callback: (eventData: {
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: {
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                postLoad: {
                    subscribe: (callback: (eventData: instancePostEventEvd<{
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }>, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: instancePostEventEvd<{
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }>, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
            };
            readonly events: {
                save: {
                    subscribe: (callback: (eventData: {
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: {
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                postSave: {
                    subscribe: (callback: (eventData: instancePostEventEvd<{
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }>, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: instancePostEventEvd<{
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }>, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                load: {
                    subscribe: (callback: (eventData: {
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: {
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
                postLoad: {
                    subscribe: (callback: (eventData: instancePostEventEvd<{
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }>, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
                    unsubscribe: (callback: (eventData: instancePostEventEvd<{
                        [k: string]: any;
                        saveInfo: {
                            version: number;
                        };
                        storage: {
                            autosaveInterval: number;
                        };
                        permission: permissionSaveData;
                        chat: chatSaveData;
                        role: roleSaveData;
                        cc: ccStorageSaveData;
                    }>, control: import("./evmngr.js").eventControl) => void) => boolean;
                };
            };
            readonly save: () => instancePostEventEvd<{
                [k: string]: any;
                saveInfo: {
                    version: number;
                };
                storage: {
                    autosaveInterval: number;
                };
                permission: permissionSaveData;
                chat: chatSaveData;
                role: roleSaveData;
                cc: ccStorageSaveData;
            }>;
            readonly load: () => instancePostEventEvd<{
                [k: string]: any;
                saveInfo: {
                    version: number;
                };
                storage: {
                    autosaveInterval: number;
                };
                permission: permissionSaveData;
                chat: chatSaveData;
                role: roleSaveData;
                cc: ccStorageSaveData;
            }>;
            readonly delete: () => boolean;
            autoload: boolean;
            "__#9@#autosaveInterval": import("./server.js").interval;
            autosaveInterval: number;
        };
    };
    static get saveInfo(): typeof saveDataInfo;
    static readonly for: (id: string) => saveDataInfo;
    static readonly delete: (id: string) => boolean;
    protected constructor();
}
declare class saveDataInfo {
    #private;
    constructor(key: typeof auth, id: string);
    id: string;
    get value(): string;
    set value(v: string);
}
export default storage;
import type { saveData as permissionSaveData } from "./permission.js";
import type { saveData as chatSaveData } from "./chat.js";
import type { saveData as roleSaveData } from "./role.js";
import type { ccStorageSaveData } from "./cc.js";
declare type instancePostEventEvd<T> = {
    readonly data: T;
    readonly stringed: string;
    readonly time: number;
};
