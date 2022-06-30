import type { internalModulesList } from "./bridgehost.js";
export default class bridgeCli {
    static readonly hostIsLoaded: boolean;
    constructor(id: string, prop: Omit<bridgeCli, 'id' | 'send'>);
    readonly id: string;
    name?: string;
    description?: string;
    author?: string[];
    version?: string;
    versionCode?: number;
    internalModules: internalModulesList;
    moduleEntry?: string;
    canBeUnloaded?: boolean;
    readonly send: () => Promise<void>;
}
