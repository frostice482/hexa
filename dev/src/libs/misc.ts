import type { Player } from "mojang-minecraft";
import { config_common } from "../configs/common.js";
import pli from "../pli.js";

export type kickConfig = {
    useTemplate?: boolean
    type?: 'kick' | 'ban' | 'blacklist'
    banDuration?: number,
    moderator?: Player | string
    reason?: string
    announceLevel?: 'none' | 'admin' | 'all'
    announceMessage?: string
}

const aa = pli.internalModules['libs/misc'] = async (b) => {
    const { world } = await b.import('mc')
    const { permission, execCmd, misc: { convertToReadableTime }, sendChat: { sendMsgToPlayers, sendMsg } } = await b.import('se')
    const ccfg = await b.importInternal('configs/common') as Awaited<config_common>

    const getAdmins = function* (excludeAdmins: Player[] = [], minLevel = 60) {
        for (const plr of world.getPlayers())
            if (!excludeAdmins.includes(plr) && permission.getLevel(plr.getTags()) >= minLevel)
                yield plr
    }

    ccfg.kick ??= {
        useKickCommand: true
    }

    const kick = (plr: Player, messsage: string | string[] | kickConfig) => {
        const {
            useTemplate = true,
            type = 'kick',
            banDuration = 0,
            moderator = '[System]',
            reason = 'N/A',
            announceLevel = 'admin',
            announceMessage = ''
        } = typeof messsage == 'string' ? { reason: messsage }
            : Array.isArray(messsage) ? { useTemplate: false, reason: messsage.join('\n§r') }
            : messsage

        const kickType = type == 'blacklist' ? '§4blacklisted§r' : type == 'ban' ? '§cbanned§r' : '§ekicked§r', 
            modName = typeof moderator == 'string' ? moderator : moderator.name,
            aa = `from${ type != 'kick' ? ' playing in ' : ' ' }this server${ type == 'ban' ? ` for §a${convertToReadableTime(banDuration, false)}§r` : '' }`
        
        if (announceLevel != 'none') {
            const announceMessageConvert = announceMessage || `§6[§eHEXA§6]§r §b${modName}§r ${kickType} §b${plr.name}§r ${aa}: ${reason}`
            if (announceLevel == 'admin') sendMsgToPlayers(getAdmins(), announceMessageConvert)
            else sendMsg('@a', announceMessageConvert)
        }
        
        try {
            if (!ccfg.kick.useKickCommand) throw 0
            execCmd(`kick ${JSON.stringify(plr.name)} ${ useTemplate ? [ `You have been ${kickType} ${aa}.`, `Moderator: §b${modName}`, `Reason: ${reason}` ].join('\n§r') : reason} `)
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
