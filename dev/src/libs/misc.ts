import type { Player } from "mojang-minecraft";
import { config_banlist } from "../configs/banlist.js";
import { config_blacklist } from "../configs/blacklist.js";
import { config_common } from "../configs/common.js";
import { misc_plrjson } from "../misc/plrjson.js";
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
    const { world, Player } = await b.import('mc')
    const { permission, execCmd, misc: { convertToReadableTime }, sendChat: { sendMsgToPlayers, sendMsg } } = await b.import('se')
    const bancfg = await b.importInternal('configs/banlist') as Awaited<config_banlist>
    const blcfg = await b.importInternal('configs/blacklist') as Awaited<config_blacklist>
    const ccfg = await b.importInternal('configs/common') as Awaited<config_common>

    const getAdmins = function* (excludeAdmins: Player[] = [], minLevel = 60) {
        for (const plr of world.getPlayers())
            if (!excludeAdmins.includes(plr) && permission.getLevel(plr.getTags()) >= minLevel)
                yield plr
    }

    // --- kick ---
    ccfg.kick ??= {
        useKickCommand: true
    }

    const alert = (msg: string) => sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r ${msg}`)

    const warn = (plr: Player, moderator: Player | string = '[System]', msg: string) => {
        plr.sendMsg(`§eYou have been warned §8-§r ${msg}`)
        sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r §b${typeof moderator == 'string' ? moderator : moderator.name}§r §gwarned§r §b${plr.name}§r: ${msg}`)
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

        // registry for ban & blacklist
        if (type == 'ban') bancfg[plr.uid] = Date.now() + banDuration * 1000
        if (type == 'blacklist') blcfg[plr.uid] = plr.uid

        // kick message
        const kickType = type == 'blacklist' ? '§4blacklisted§r' : type == 'ban' ? '§cbanned§r' : '§ekicked§r', 
            modName = typeof moderator == 'string' ? moderator : moderator.name,
            aa = `from${ type != 'kick' ? ' playing in ' : ' ' }this server${ type == 'ban' ? ` for §a${convertToReadableTime(banDuration, false)}§r` : '' }`
        
        // kick announce
        if (announceLevel != 'none') {
            const announceMessageConvert = announceMessage || `§6[§eHEXA§6]§r §b${modName}§r ${kickType} §b${plr.name}§r ${aa}: ${reason}`
            if (announceLevel == 'admin') sendMsgToPlayers(getAdmins(), announceMessageConvert)
            else sendMsg('@a', announceMessageConvert)
        }
        
        // kick player
        try {
            if (usePlayerJson && !ccfg.kick.useKickCommand) throw 0
            execCmd(`kick ${JSON.stringify(plr.name)} ${ useTemplate ? [ `You have been ${kickType} ${aa}.`, `Moderator: §b${modName}`, `Reason: ${reason}` ].join('\n§r') : reason} `)
        } catch {
            kickablePlayers.add(plr)
            plr.triggerEvent('hexa:kick')
        }
    }

    const kickablePlayers = new WeakSet<Player>()

    let usePlayerJson = false
    ;(b.importInternal('misc/plrjson') as misc_plrjson).then(v => {
        if (!v) sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r player.json is not detected / currently overridden.`)
        usePlayerJson = v
    })

    const aa = world.events.beforeDataDrivenEntityTriggerEvent.subscribe((evd) => {
        if (
            evd.entity instanceof Player
            && evd.id == 'hexa:kick'
            && !kickablePlayers.has(evd.entity)
        ) evd.cancel = true
    })

    const ab = b.ev.unload.subscribe(() => {
        world.events.beforeDataDrivenEntityTriggerEvent.unsubscribe(aa)
        b.ev.unload.unsubscribe(ab)
    })

    return {
        alert,
        warn,
        kick,
        getAdmins
    }
}

export type libs_misc = ReturnType<typeof aa>
