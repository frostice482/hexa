export declare const empty: <T extends {}>(obj?: T) => T;
export declare const viewObj: (o: any, tab?: string, tabSeparator?: string) => string;
export declare const randomstr: (length: number, charset?: string) => string;
export declare const parseRegex: (regex: string) => RegExp;
export declare const deepAssign: <A, B>(to: any, source: any) => A & B;
export declare const convertToReadableTime: (time: number, isMillisecond?: boolean) => string;
export declare const renameFn: <fn extends Function>(fn: fn, name: string | ((fName: string) => string)) => fn;
