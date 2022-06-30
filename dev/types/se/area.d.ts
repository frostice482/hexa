import { BlockAreaSize, BlockLocation, Location } from "mojang-minecraft";
export default class Area {
    #private;
    static readonly toLocationArray: ({ x, y, z }: Location | BlockLocation | BlockAreaSize) => locationArray;
    static readonly toBlockPos: (loc: locationArray) => locationArray;
    static readonly toLocation: (loc: locationArray) => Location;
    static readonly toBlockLocation: (loc: locationArray) => BlockLocation;
    constructor(from: locationArray, to: locationArray);
    get from(): locationArray;
    get to(): locationArray;
    readonly getSize: () => locationArray;
    readonly getVolume: () => number;
    readonly getCenter: () => locationArray;
    readonly extend: (size: number) => void;
    readonly shrink: (size: number) => void;
    readonly extendAxis: (axis: keyof typeof axisEnum, size: number) => void;
    readonly shrinkAxis: (axis: keyof typeof axisEnum, size: number) => void;
    readonly isInside: (loc: locationArray) => boolean;
    readonly getClosestAxisDistance: (loc: locationArray) => locationArray;
    readonly getClosestDistance: (loc: locationArray) => number;
    readonly getClosestLocation: (loc: locationArray) => locationArray;
    readonly fragment: (size: locationArray | number) => Generator<{
        from: locationArray;
        to: locationArray;
    }, void, unknown>;
}
declare const axisEnum: {
    readonly x: 0;
    readonly y: 1;
    readonly z: 2;
    readonly 0: 0;
    readonly 1: 1;
    readonly 2: 2;
};
export declare type locationArray = [x: number, y: number, z: number];
export {};
