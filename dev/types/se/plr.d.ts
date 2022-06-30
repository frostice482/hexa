import { Player } from "mojang-minecraft";
export default class plr {
    static get ev(): {
        nametagChange: {
            subscribe: (callback: (eventData: nametagChangeEvd, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: nametagChangeEvd, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
        playerRegister: {
            subscribe: (callback: (eventData: Player, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: Player, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
    };
    static get events(): {
        nametagChange: {
            subscribe: (callback: (eventData: nametagChangeEvd, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: nametagChangeEvd, control: import("./evmngr.js").eventControl) => void) => boolean;
        };
        playerRegister: {
            subscribe: (callback: (eventData: Player, control: import("./evmngr.js").eventControl) => void, priority?: number) => void;
            unsubscribe: (callback: (eventData: Player, control: import("./evmngr.js").eventControl) => void) => boolean;
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
