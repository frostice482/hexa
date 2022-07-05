export default class TypedValues {
    static get value(): typeof TypedValue;
    static get object(): typeof TypedObject;
    static get array(): typeof TypedArray;
    static get arraySpecific(): typeof TypedArraySpecific;
    static readonly fromJSON: (jsonData: JSONData['all'][]) => TypedValue | TypedObject | TypedArray | TypedArraySpecific;
    protected constructor();
}
export declare class TypedValue {
    #private;
    static readonly fromJSON: (jsonData: JSONData['all'][], referenceList?: Record<number, allTypes>, index?: number) => TypedValue;
    constructor(...type: valueTypes['all'][]);
    name: string;
    readonly addType: (...type: valueTypes['all'][]) => this;
    readonly removeType: (...type: valueTypes['all'][]) => this;
    readonly test: (value: any) => boolean;
    readonly toJSON: () => ({
        type: "value";
        name: string;
        data: {
            type: ("string" | "number" | "boolean" | "any")[];
            specifics?: {
                string?: string[];
                number?: number[];
                boolean?: ("true" | "false")[];
            };
            objects?: number[];
        };
    } | {
        type: "object";
        name: string;
        data: {
            allowUnusedProperties: boolean;
            indexType: number;
            objData: [key: string, propData: [data: number, required: boolean]][];
        };
    } | {
        type: "array";
        name: string;
        data: number;
    } | {
        type: "arraySpecific";
        name: string;
        minLength: number;
        allowOverlength: boolean;
        data: number[];
    })[];
    readonly getReferenceList: (refList?: allTypes[]) => allTypes[];
    readonly JSONConvertion: (refList: Map<allTypes, number>) => JSONData['TypedValue'];
}
export declare class TypedObject {
    #private;
    static readonly fromJSON: (jsonData: JSONData['all'][], referenceList?: Record<number, allTypes>, index?: number) => TypedObject;
    constructor();
    name: string;
    readonly allowUnusedProperties: (v: boolean) => this;
    readonly setIndexType: (type: allTypes) => this;
    readonly define: (key: string, type: allTypes, required?: boolean) => this;
    readonly 'delete': (key: string) => this;
    readonly test: (obj: any) => boolean;
    readonly toJSON: () => ({
        type: "value";
        name: string;
        data: {
            type: ("string" | "number" | "boolean" | "any")[];
            specifics?: {
                string?: string[];
                number?: number[];
                boolean?: ("true" | "false")[];
            };
            objects?: number[];
        };
    } | {
        type: "object";
        name: string;
        data: {
            allowUnusedProperties: boolean;
            indexType: number;
            objData: [key: string, propData: [data: number, required: boolean]][];
        };
    } | {
        type: "array";
        name: string;
        data: number;
    } | {
        type: "arraySpecific";
        name: string;
        minLength: number;
        allowOverlength: boolean;
        data: number[];
    })[];
    readonly getReferenceList: (refList?: allTypes[]) => allTypes[];
    readonly JSONConvertion: (refList: Map<allTypes, number>) => JSONData['TypedObject'];
}
export declare class TypedArray {
    static readonly fromJSON: (jsonData: JSONData['all'][], referenceList?: Record<number, allTypes>, index?: number) => TypedArray;
    constructor(type?: allTypes);
    type: allTypes;
    name: string;
    readonly test: (arr?: any[]) => boolean;
    readonly toJSON: () => ({
        type: "value";
        name: string;
        data: {
            type: ("string" | "number" | "boolean" | "any")[];
            specifics?: {
                string?: string[];
                number?: number[];
                boolean?: ("true" | "false")[];
            };
            objects?: number[];
        };
    } | {
        type: "object";
        name: string;
        data: {
            allowUnusedProperties: boolean;
            indexType: number;
            objData: [key: string, propData: [data: number, required: boolean]][];
        };
    } | {
        type: "array";
        name: string;
        data: number;
    } | {
        type: "arraySpecific";
        name: string;
        minLength: number;
        allowOverlength: boolean;
        data: number[];
    })[];
    readonly getReferenceList: (refList?: allTypes[]) => allTypes[];
    readonly JSONConvertion: (refList: Map<allTypes, number>) => JSONData['TypedArray'];
}
export declare class TypedArraySpecific {
    static readonly fromJSON: (jsonData: JSONData['all'][], referenceList?: Record<number, allTypes>, index?: number) => TypedArraySpecific;
    constructor(type?: allTypes[], minLength?: number);
    type: allTypes[];
    minLength: number;
    allowOverlength: boolean;
    name: string;
    readonly test: (arr?: any[]) => any;
    readonly toJSON: () => ({
        type: "value";
        name: string;
        data: {
            type: ("string" | "number" | "boolean" | "any")[];
            specifics?: {
                string?: string[];
                number?: number[];
                boolean?: ("true" | "false")[];
            };
            objects?: number[];
        };
    } | {
        type: "object";
        name: string;
        data: {
            allowUnusedProperties: boolean;
            indexType: number;
            objData: [key: string, propData: [data: number, required: boolean]][];
        };
    } | {
        type: "array";
        name: string;
        data: number;
    } | {
        type: "arraySpecific";
        name: string;
        minLength: number;
        allowOverlength: boolean;
        data: number[];
    })[];
    readonly getReferenceList: (refList?: allTypes[]) => allTypes[];
    readonly JSONConvertion: (refList: Map<allTypes, number>) => JSONData['TypedArraySpecific'];
}
declare type valueTypes = {
    valueType: 'string' | 'number' | 'boolean' | 'any';
    specifics: (string | number | boolean)[];
    objects: (TypedValue | TypedObject | TypedArray | TypedArraySpecific);
    all: valueTypes[Exclude<keyof valueTypes, 'all'>];
};
declare type allTypes = TypedValue | TypedObject | TypedArray | TypedArraySpecific;
export { allTypes as typedValuesAll };
declare type JSONData = {
    TypedValue: {
        type: 'value';
        name: string;
        data: {
            type: valueTypes['valueType'][];
            specifics?: {
                string?: string[];
                number?: number[];
                boolean?: ('true' | 'false')[];
            };
            objects?: number[];
        };
    };
    TypedObject: {
        type: 'object';
        name: string;
        data: {
            allowUnusedProperties: boolean;
            indexType: number;
            objData: [
                key: string,
                propData: [
                    data: number,
                    required: boolean
                ]
            ][];
        };
    };
    TypedArray: {
        type: 'array';
        name: string;
        data: number;
    };
    TypedArraySpecific: {
        type: 'arraySpecific';
        name: string;
        minLength: number;
        allowOverlength: boolean;
        data: number[];
    };
    all: JSONData[Exclude<keyof JSONData, 'all' | 'default'>];
};
export { JSONData as typedValuesJSON };
