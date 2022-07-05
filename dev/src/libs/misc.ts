import type { Player } from "mojang-minecraft";
import pli from "../pli.js";

const aa = pli.internalModules['libs/misc'] = async (b) => {
    const { world } = await b.import('mc')
    const { permission } = await b.import('se')

    const getAdmins = function* (excludeAdmins: Player[] = [], minLevel = 60) {
        for (const plr of world.getPlayers())
            if (!excludeAdmins.includes(plr) && permission.getLevel(plr.getTags()) >= minLevel)
                yield plr
    }

    return {
        getAdmins
    }
}

export type libs_misc = ReturnType<typeof aa>
