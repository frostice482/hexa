import { Dimension, Entity } from 'mojang-minecraft';
export declare const dim: Readonly<{
    overworld: Dimension;
    nether: Dimension;
    end: Dimension;
    o: Dimension;
    n: Dimension;
    e: Dimension;
}>;
declare type dimKeys = keyof typeof dim;
export declare const execCmd: (command: string, source?: dimKeys | Entity | Dimension, ignoreError?: boolean) => CommandResponse;
declare type CommandResponse = {
    [k: string]: any;
    readonly statusCode: number;
    readonly statusMessage: string;
};
export {};
