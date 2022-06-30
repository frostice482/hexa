import { ScoreboardObjective } from 'mojang-minecraft';
import { Player } from 'mojang-minecraft';
declare const auth: unique symbol;
export default class scoreboard {
    static get display(): typeof display;
    static get objective(): typeof objective;
    protected constructor();
}
declare type displaySlot = 'sidebar' | 'list' | 'belowname';
declare class objective {
    #private;
    static readonly create: (id: string, displayName?: string) => objective;
    static readonly edit: (id: string) => objective;
    static readonly for: (id: string, displayName?: string) => objective;
    static readonly exist: (id: string) => boolean;
    static readonly delete: (id: string) => boolean;
    static readonly getList: () => objective[];
    constructor(id: string, displayName?: string, create?: boolean);
    readonly id: string;
    readonly execId: string;
    get displayName(): string;
    get data(): ScoreboardObjective;
    readonly dummies: dummies;
    readonly players: players;
    readonly display: display;
}
declare class players {
    #private;
    constructor(key: typeof auth, obj: objective, data: ScoreboardObjective);
    readonly 'set': (plr: Player, score: number) => this;
    readonly add: (plr: Player, score: number) => this;
    readonly 'get': (plr: Player) => number;
    readonly exist: (plr: Player) => boolean;
    readonly delete: (plr: Player) => boolean;
    readonly getScores: () => Generator<[player: Player, score: number, displayName: string], void, unknown>;
}
declare class dummies {
    #private;
    constructor(key: typeof auth, obj: objective, data: ScoreboardObjective);
    readonly 'set': (name: string, score: number) => this;
    readonly add: (name: string, score: number) => this;
    readonly 'get': (name: string) => number;
    readonly exist: (name: string) => boolean;
    readonly delete: (name: string) => boolean;
    readonly getScores: () => Generator<[displayName: string, score: number], void, unknown>;
}
declare class display {
    #private;
    static readonly setDisplay: (displaySlot: displaySlot, scoreboard: objective | string) => boolean;
    static readonly clearDisplay: (displaySlot: displaySlot) => boolean;
    constructor(key: typeof auth, obj: objective);
    readonly setDisplay: (displaySlot: displaySlot) => boolean;
    readonly clearDisplay: (displaySlot: displaySlot) => boolean;
}
export {};
