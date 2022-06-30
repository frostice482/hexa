import { Player } from "mojang-minecraft";
export default class permission {
    static readonly assign: (tag: string, level: number) => typeof permission;
    static readonly isAssigned: (tag: string) => boolean;
    static readonly deassign: (tag: string) => boolean;
    static readonly getList: () => [string, number][];
    static readonly 'get': (tag: string) => number;
    static readonly getLevel: (tags: string[]) => number;
    static readonly getAdmins: (plr: Player) => Generator<Player, void, unknown>;
    protected constructor();
}
export declare type saveData = {
    levels: [tag: string, level: number][];
};
