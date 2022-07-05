import eventManager from "./evmngr.js";
declare const auth: unique symbol;
export declare class storage {
    static get instance(): {
        new <T = {}>(id: string): {
            "__#10311@#id": string;
            id: string;
            "__#10311@#execId": string;
            readonly execId: string;
            "__#10311@#saveInfo": saveDataInfo;
            readonly saveInfo: saveDataInfo;
            readonly ev: {
                save: {
                    subscribe: <callback extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback, priority?: number) => callback;
                    unsubscribe: <callback_1 extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback_1) => boolean;
                };
                postSave: {
                    subscribe: <callback_2 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_2, priority?: number) => callback_2;
                    unsubscribe: <callback_3 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_3) => boolean;
                };
                load: {
                    subscribe: <callback_4 extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback_4, priority?: number) => callback_4;
                    unsubscribe: <callback_5 extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback_5) => boolean;
                };
                postLoad: {
                    subscribe: <callback_6 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_6, priority?: number) => callback_6;
                    unsubscribe: <callback_7 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_7) => boolean;
                };
            };
            readonly events: {
                save: {
                    subscribe: <callback extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback, priority?: number) => callback;
                    unsubscribe: <callback_1 extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback_1) => boolean;
                };
                postSave: {
                    subscribe: <callback_2 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_2, priority?: number) => callback_2;
                    unsubscribe: <callback_3 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_3) => boolean;
                };
                load: {
                    subscribe: <callback_4 extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback_4, priority?: number) => callback_4;
                    unsubscribe: <callback_5 extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback_5) => boolean;
                };
                postLoad: {
                    subscribe: <callback_6 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_6, priority?: number) => callback_6;
                    unsubscribe: <callback_7 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_7) => boolean;
                };
            };
            readonly save: () => instancePostEventEvd<T>;
            readonly load: () => instancePostEventEvd<T>;
            readonly delete: () => boolean;
            autoload: boolean;
            "__#10311@#autosaveInterval": import("./server.js").interval;
            autosaveInterval: number;
        };
        readonly default: {
            "__#10312@#uniqueID": string;
            readonly uniqueID: string;
            "__#10311@#id": string;
            id: string;
            "__#10311@#execId": string;
            readonly execId: string;
            "__#10311@#saveInfo": saveDataInfo;
            readonly saveInfo: saveDataInfo;
            readonly ev: {
                save: {
                    subscribe: <callback_8 extends (evd: {
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
                    }, control: import("./evmngr.js").eventControl) => any>(callback: callback_8, priority?: number) => callback_8;
                    unsubscribe: <callback_9 extends (evd: {
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
                    }, control: import("./evmngr.js").eventControl) => any>(callback: callback_9) => boolean;
                };
                postSave: {
                    subscribe: <callback_10 extends (evd: instancePostEventEvd<{
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
                    }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_10, priority?: number) => callback_10;
                    unsubscribe: <callback_11 extends (evd: instancePostEventEvd<{
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
                    }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_11) => boolean;
                };
                load: {
                    subscribe: <callback_12 extends (evd: {
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
                    }, control: import("./evmngr.js").eventControl) => any>(callback: callback_12, priority?: number) => callback_12;
                    unsubscribe: <callback_13 extends (evd: {
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
                    }, control: import("./evmngr.js").eventControl) => any>(callback: callback_13) => boolean;
                };
                postLoad: {
                    subscribe: <callback_14 extends (evd: instancePostEventEvd<{
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
                    }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_14, priority?: number) => callback_14;
                    unsubscribe: <callback_15 extends (evd: instancePostEventEvd<{
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
                    }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_15) => boolean;
                };
            };
            readonly events: {
                save: {
                    subscribe: <callback_8 extends (evd: {
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
                    }, control: import("./evmngr.js").eventControl) => any>(callback: callback_8, priority?: number) => callback_8;
                    unsubscribe: <callback_9 extends (evd: {
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
                    }, control: import("./evmngr.js").eventControl) => any>(callback: callback_9) => boolean;
                };
                postSave: {
                    subscribe: <callback_10 extends (evd: instancePostEventEvd<{
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
                    }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_10, priority?: number) => callback_10;
                    unsubscribe: <callback_11 extends (evd: instancePostEventEvd<{
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
                    }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_11) => boolean;
                };
                load: {
                    subscribe: <callback_12 extends (evd: {
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
                    }, control: import("./evmngr.js").eventControl) => any>(callback: callback_12, priority?: number) => callback_12;
                    unsubscribe: <callback_13 extends (evd: {
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
                    }, control: import("./evmngr.js").eventControl) => any>(callback: callback_13) => boolean;
                };
                postLoad: {
                    subscribe: <callback_14 extends (evd: instancePostEventEvd<{
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
                    }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_14, priority?: number) => callback_14;
                    unsubscribe: <callback_15 extends (evd: instancePostEventEvd<{
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
                    }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_15) => boolean;
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
            "__#10311@#autosaveInterval": import("./server.js").interval;
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
declare type storageDataInfo = typeof storage.saveInfo.prototype;
export default storage;
import type { saveData as permissionSaveData } from "./permission.js";
import type { saveData as chatSaveData } from "./chat.js";
import type { saveData as roleSaveData } from "./role.js";
import type { ccStorageSaveData } from "./cc.js";
export declare const instance: {
    new <T = {}>(id: string): {
        "__#10311@#id": string;
        id: string;
        "__#10311@#execId": string;
        readonly execId: string;
        "__#10311@#saveInfo": storageDataInfo;
        readonly saveInfo: saveDataInfo;
        readonly ev: {
            save: {
                subscribe: <callback extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback, priority?: number) => callback;
                unsubscribe: <callback_1 extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback_1) => boolean;
            };
            postSave: {
                subscribe: <callback_2 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_2, priority?: number) => callback_2;
                unsubscribe: <callback_3 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_3) => boolean;
            };
            load: {
                subscribe: <callback_4 extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback_4, priority?: number) => callback_4;
                unsubscribe: <callback_5 extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback_5) => boolean;
            };
            postLoad: {
                subscribe: <callback_6 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_6, priority?: number) => callback_6;
                unsubscribe: <callback_7 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_7) => boolean;
            };
        };
        readonly events: {
            save: {
                subscribe: <callback extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback, priority?: number) => callback;
                unsubscribe: <callback_1 extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback_1) => boolean;
            };
            postSave: {
                subscribe: <callback_2 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_2, priority?: number) => callback_2;
                unsubscribe: <callback_3 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_3) => boolean;
            };
            load: {
                subscribe: <callback_4 extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback_4, priority?: number) => callback_4;
                unsubscribe: <callback_5 extends (evd: T, control: import("./evmngr.js").eventControl) => any>(callback: callback_5) => boolean;
            };
            postLoad: {
                subscribe: <callback_6 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_6, priority?: number) => callback_6;
                unsubscribe: <callback_7 extends (evd: instancePostEventEvd<T>, control: import("./evmngr.js").eventControl) => any>(callback: callback_7) => boolean;
            };
        };
        readonly save: () => instancePostEventEvd<T>;
        readonly load: () => instancePostEventEvd<T>;
        readonly delete: () => boolean;
        autoload: boolean;
        "__#10311@#autosaveInterval": import("./server.js").interval;
        autosaveInterval: number;
    };
    readonly default: {
        "__#10312@#uniqueID": string;
        readonly uniqueID: string;
        "__#10311@#id": string;
        id: string;
        "__#10311@#execId": string;
        readonly execId: string;
        "__#10311@#saveInfo": storageDataInfo;
        readonly saveInfo: saveDataInfo;
        readonly ev: {
            save: {
                subscribe: <callback_8 extends (evd: {
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
                }, control: import("./evmngr.js").eventControl) => any>(callback: callback_8, priority?: number) => callback_8;
                unsubscribe: <callback_9 extends (evd: {
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
                }, control: import("./evmngr.js").eventControl) => any>(callback: callback_9) => boolean;
            };
            postSave: {
                subscribe: <callback_10 extends (evd: instancePostEventEvd<{
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
                }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_10, priority?: number) => callback_10;
                unsubscribe: <callback_11 extends (evd: instancePostEventEvd<{
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
                }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_11) => boolean;
            };
            load: {
                subscribe: <callback_12 extends (evd: {
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
                }, control: import("./evmngr.js").eventControl) => any>(callback: callback_12, priority?: number) => callback_12;
                unsubscribe: <callback_13 extends (evd: {
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
                }, control: import("./evmngr.js").eventControl) => any>(callback: callback_13) => boolean;
            };
            postLoad: {
                subscribe: <callback_14 extends (evd: instancePostEventEvd<{
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
                }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_14, priority?: number) => callback_14;
                unsubscribe: <callback_15 extends (evd: instancePostEventEvd<{
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
                }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_15) => boolean;
            };
        };
        readonly events: {
            save: {
                subscribe: <callback_8 extends (evd: {
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
                }, control: import("./evmngr.js").eventControl) => any>(callback: callback_8, priority?: number) => callback_8;
                unsubscribe: <callback_9 extends (evd: {
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
                }, control: import("./evmngr.js").eventControl) => any>(callback: callback_9) => boolean;
            };
            postSave: {
                subscribe: <callback_10 extends (evd: instancePostEventEvd<{
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
                }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_10, priority?: number) => callback_10;
                unsubscribe: <callback_11 extends (evd: instancePostEventEvd<{
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
                }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_11) => boolean;
            };
            load: {
                subscribe: <callback_12 extends (evd: {
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
                }, control: import("./evmngr.js").eventControl) => any>(callback: callback_12, priority?: number) => callback_12;
                unsubscribe: <callback_13 extends (evd: {
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
                }, control: import("./evmngr.js").eventControl) => any>(callback: callback_13) => boolean;
            };
            postLoad: {
                subscribe: <callback_14 extends (evd: instancePostEventEvd<{
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
                }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_14, priority?: number) => callback_14;
                unsubscribe: <callback_15 extends (evd: instancePostEventEvd<{
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
                }>, control: import("./evmngr.js").eventControl) => any>(callback: callback_15) => boolean;
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
        "__#10311@#autosaveInterval": import("./server.js").interval;
        autosaveInterval: number;
    };
};
declare type instanceEvents<T> = {
    save: T;
    postSave: instancePostEventEvd<T>;
    load: T;
    postLoad: instancePostEventEvd<T>;
};
declare type instancePostEventEvd<T> = {
    readonly data: T;
    readonly stringed: string;
    readonly time: number;
};
