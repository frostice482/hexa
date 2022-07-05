import { Player } from "mojang-minecraft";
export default class plr {
    static get ev(): {
        nametagChange: {
            subscribe: <callback extends (evd: nametagChangeEvd, control: import("./evmngr.js").eventControl) => any>(callback: callback, priority?: number) => callback;
            unsubscribe: <callback_1 extends (evd: nametagChangeEvd, control: import("./evmngr.js").eventControl) => any>(callback: callback_1) => boolean;
        };
        playerRegister: {
            subscribe: <callback_2 extends (evd: Player, control: import("./evmngr.js").eventControl) => any>(callback: callback_2, priority?: number) => callback_2;
            unsubscribe: <callback_3 extends (evd: Player, control: import("./evmngr.js").eventControl) => any>(callback: callback_3) => boolean;
        };
    };
    static get events(): {
        nametagChange: {
            subscribe: <callback extends (evd: nametagChangeEvd, control: import("./evmngr.js").eventControl) => any>(callback: callback, priority?: number) => callback;
            unsubscribe: <callback_1 extends (evd: nametagChangeEvd, control: import("./evmngr.js").eventControl) => any>(callback: callback_1) => boolean;
        };
        playerRegister: {
            subscribe: <callback_2 extends (evd: Player, control: import("./evmngr.js").eventControl) => any>(callback: callback_2, priority?: number) => callback_2;
            unsubscribe: <callback_3 extends (evd: Player, control: import("./evmngr.js").eventControl) => any>(callback: callback_3) => boolean;
        };
    };
    protected constructor();
}
declare type nametagChangeEvd = {
    readonly plr: Player;
    cancel: boolean;
    nameTag: string;
};
export {};
