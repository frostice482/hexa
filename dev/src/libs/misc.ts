import type { Player } from "mojang-minecraft";
import { config_common } from "../configs/common.js";
import pli from "../pli.js";

const aa = pli.internalModules['libs/misc'] = async (b) => {
    const { world } = await b.import('mc')
    const { permission, execCmd } = await b.import('se')
    const ccfg = await b.importInternal('configs/common') as Awaited<config_common>

    const getAdmins = function* (excludeAdmins: Player[] = [], minLevel = 60) {
        for (const plr of world.getPlayers())
            if (!excludeAdmins.includes(plr) && permission.getLevel(plr.getTags()) >= minLevel)
                yield plr
    }

    ccfg['kick:useKickCommand'] ??= 1

    const kick = (plr: Player, messsage: string | string[]) => {
        try {
            if (!ccfg['kick:useKickCommand']) throw 0
            execCmd(`kick ${JSON.stringify(plr.name)} ${ Array.isArray(messsage) ? messsage.join('\n\u00a7r') : messsage }`)
        } catch {
            plr.triggerEvent('se:kick')
        }
    }

    return {
        kick,
        getAdmins
    }
}

export type libs_misc = ReturnType<typeof aa>
