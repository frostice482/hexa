import { BeforeChatEvent, Dimension, Player } from "mojang-minecraft";
import { typedValuesAll, typedValuesJSON } from "./typedvalues.js";
export default class cc {
    #private;
    static get parser(): typeof parser;
    static get typedArgs(): typeof TypedArgs;
    static get description(): typeof ccDescription;
    static get error(): typeof ccError;
    static get prefix(): string;
    static set prefix(v: string);
    static readonly 'get': (id: string | cc) => cc;
    static readonly getCommandFromTrigger: (trigger: string) => cc;
    static readonly exist: (id: string | cc) => boolean;
    static readonly getList: () => IterableIterator<cc>;
    static readonly delete: (id: string | cc) => boolean;
    static readonly execute: (evd: BeforeChatEvent) => void;
    static readonly fromJSON: (data: ccJSONData) => cc;
    static readonly fromJSONSave: (data: ccSaveJSONData, overwrite?: boolean) => cc;
    static testReqTags: (reqTags: cc['reqTags'], plr: Player) => boolean;
    constructor(id: string, properties?: Partial<Omit<cc, 'id' | 'toJSONSave' | 'toJSON'>>);
    readonly id: string;
    description?: ccDescription;
    minPermLvl?: number;
    reqTags?: {
        [K in 'all' | 'any' | 'none']: this['reqTags'];
    } | string[];
    isHidden?: boolean;
    isDisabled?: boolean;
    isDefault?: boolean;
    typedArgs?: TypedArgs;
    triggers: RegExp | string[];
    onTrigger: ccOnTriggerFn | ccOnTrigger['all'] | ccOnTrigger['all'][];
    onDelete: () => void;
    readonly toJSON: () => ccJSONData;
    readonly toJSONSave: () => ccSaveJSONData;
}
declare type ccOnTriggerFn = (vars: ccVars) => void;
declare type ccOnTrigger = {
    command: {
        type: 'command';
        commands: string[];
        ignoreError?: boolean;
    };
    eval: {
        type: 'eval';
        script: string;
        scriptCache?: ccOnTriggerFn;
    };
    all: ccOnTrigger[Exclude<keyof ccOnTrigger, 'all'>];
};
declare type ccOnTriggerJSONData = {
    command: {
        type: 'command';
        commands: string[];
        ignoreError?: boolean;
    };
    eval: {
        type: 'eval';
        script: string;
    };
    all: ccOnTrigger[Exclude<keyof ccOnTriggerJSONData, 'all'>];
};
declare type ccJSONData = {
    id: string;
    description?: ccDescriptionJSONData;
    minPermLvl?: number;
    isHidden?: boolean;
    isDisabled?: boolean;
    isDefault?: boolean;
    reqTags?: cc['reqTags'];
    typedArgs?: TAJSONSeqs;
    triggers: {
        type: 'regexp';
        value: string;
    } | {
        type: 'array';
        value: string[];
    };
    onTrigger: ccOnTriggerJSONData['all'] | ccOnTriggerJSONData['all'][];
};
declare type ccSaveJSONData = {
    id: string;
    extends: true;
    data: Partial<Pick<cc, 'minPermLvl' | 'reqTags' | 'isHidden' | 'isDisabled'>>;
} | {
    id: string;
    extends: false;
    data: ccJSONData;
};
declare class ccDescription {
    static readonly fromJSON: (data: ccDescriptionJSONData) => ccDescription;
    constructor(properties?: Partial<ccDescriptionJSONData>);
    name: string;
    description: string;
    aliases: string[];
    usage: [
        usage: (string | {
            type: [type: 'keyword' | 'value', value: string][];
            name?: string;
            required?: boolean;
        })[],
        description?: string,
        example?: string
    ][];
    variables: Record<PropertyKey, any>;
    formats: {
        aliases?: {
            format?: string;
            joinSeparator?: string;
        };
        type?: {
            typeFormat?: {
                keyword?: string;
                value?: string;
                joinSeparator?: string;
            };
            format?: {
                typeOnly?: string;
                withName?: string;
                typeOnlyOptional?: string;
                withNameOptional?: string;
            };
        };
        usage?: {
            format?: {
                usageOnly?: string;
                withDescription?: string;
                withExample?: string;
                joinSeparator?: string;
            };
            sequenceFormat?: {
                keyword?: string;
                type?: string;
                joinSeparator?: string;
            };
        };
    };
    format: string;
    cache?: string;
    get [Symbol.toPrimitive](): (ignoreCache?: boolean) => string;
    get toString(): (ignoreCache?: boolean) => string;
    readonly generate: (ignoreCache?: boolean) => string;
    readonly toJSON: () => ccDescriptionJSONData;
}
declare type ccDescriptionJSONData = Omit<ccDescription, 'toJSON' | 'generate' | 'toString' | symbol>;
export declare type ccVars = {
    [k: string]: any;
    readonly command: cc;
    readonly trigger: string;
    readonly argFull: string;
    readonly args: string[];
    readonly typedArgs: any[];
    readonly executer: Player;
    readonly beforeChatEvd: BeforeChatEvent;
    readonly log: (msg: any) => void;
};
declare class ccError extends Error {
    constructor(message?: string, name?: string);
}
declare class parser {
    static readonly number: ((arg: string) => number) & {
        toJSON: () => parserJSONData['number'];
    };
    static readonly boolean: ((arg: string) => boolean) & {
        toJSON: () => parserJSONData['boolean'];
    };
    static readonly switch: ((arg: string) => boolean) & {
        toJSON: () => parserJSONData['switch'];
    };
    static readonly regex: ((regex: string) => RegExp) & {
        toJSON: () => parserJSONData['regex'];
    };
    static readonly arg: (arg: string) => string[];
    static readonly typedValues: <T>(type: typedValuesAll) => ((arg: string) => T) & {
        toJSON: () => parserJSONData['typedValue'];
    };
    static readonly playerSelector: ((selector: string) => {
        readonly execute: (source?: Player | Dimension) => Generator<Player, any, unknown>;
        "__#14@#selector": string;
        "__#14@#plrCache": Player;
        readonly toString: () => string;
        readonly [Symbol.toPrimitive]: () => string;
    }) & {
        toJSON: () => parserJSONData['selector'];
    };
    static readonly any: ((v: any) => any) & {
        toJSON: () => parserJSONData['any'];
    };
    protected constructor();
}
declare type parserJSONData = {
    number: {
        type: 'number';
    };
    boolean: {
        type: 'boolean';
    };
    switch: {
        type: 'switch';
    };
    selector: {
        type: 'selector';
    };
    any: {
        type: 'any';
    };
    regex: {
        type: 'regex';
    };
    typedValue: {
        type: 'typedValue';
        data: typedValuesJSON['all'][];
    };
    all: parserJSONData[Exclude<keyof parserJSONData, 'all'>];
};
declare class TypedArgs {
    #private;
    static readonly fromJSON: (data: TAJSONSeqs) => TypedArgs;
    constructor(sequences?: TASeqs);
    readonly addSequence: (sequence: (TASeqPart | TASeqPart[])[], minArgs?: number) => void;
    readonly toJSON: () => TAJSONSeqs;
    readonly parse: (v: string | string[]) => any[];
    get sequence(): TASeqs;
}
declare type TASeqPart = string | {
    (v: string): any;
    toJSON: () => parserJSONData['all'];
};
declare type TASeqs = {
    sequence: (TASeqPart | TASeqPart[])[];
    minArgs?: number;
}[];
declare type TAJSONSeqPart = string | parserJSONData['all'];
declare type TAJSONSeqs = {
    sequence: (TAJSONSeqPart | TAJSONSeqPart[])[];
    minArgs: number;
}[];
export declare type ccStorageSaveData = {
    prefix: string;
    ccs: ccSaveJSONData[];
};
export {};
