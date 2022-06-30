import { Player } from "mojang-minecraft";
export declare const convertToString: (v: any) => string;
export declare const sendMsg: (target: string, message: any) => any;
export declare const sendMsgToPlayer: (target: Player, message: any) => any;
export declare const sendMsgToPlayers: (target: Iterable<Player>, message: any) => void;
