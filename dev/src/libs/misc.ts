import type { Player } from "mojang-minecraft";
import { config_banlist } from "../configs/banlist.js";
import { config_blacklist } from "../configs/blacklist.js";
import { config_common } from "../configs/common.js";
import { config_log } from "../configs/log.js";
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
    writeLog?: boolean
}

const aa = pli.internalModules['libs/misc'] = async (b) => {
    const { world, Player } = await b.import('mc')
    const { permission, execCmd, misc: { convertToReadableTime }, sendChat: { sendMsgToPlayers, sendMsg } } = await b.import('se')
    const log = await b.importInternal('configs/log') as Awaited<config_log>
    const bancfg = await b.importInternal('configs/banlist') as Awaited<config_banlist>
    const blcfg = await b.importInternal('configs/blacklist') as Awaited<config_blacklist>
    const ccfg = await b.importInternal('configs/common') as Awaited<config_common>

    const getAdmins = function* (excludeAdmins: Player[] = [], minLevel = 60) {
        for (const plr of world.getPlayers())
            if (!excludeAdmins.includes(plr) && permission.getLevel(plr.getTags()) >= minLevel)
                yield plr
    }

    const parseTimeFormat = (f: string) => {
        if (!/^(\d+[smhdwy][,_]?)+$/.test(f)) throw new SyntaxError(`'${f}' is not a valid time format`)
        const timeDefs = {
            s: 1000,
            m: 60000,
            h: 3600000,
            d: 86400000,
            w: 604800000,
            y: 31536000000
        }
        let exec: RegExpExecArray, rx = /(\d+)([smhdwy])/g, t = 0
        while (exec = rx.exec(f)) t += timeDefs[exec[2]] * +exec[1]
        return t
    }

    const binarySearch = <T extends any[]>(arr: T, searchCb: (v: T[number]) => number, startPoint = 0, endPoint = arr.length - 1): T[number] => {
        if (startPoint == endPoint) return searchCb(arr[startPoint]) == 0 ? arr[startPoint] : undefined
        const midPoint = ~~( ( startPoint + endPoint ) / 2 ), v = arr[midPoint]
        const cbv = searchCb(v)
        return cbv == 0 ? v
            : cbv > 0 ? binarySearch(arr, searchCb, startPoint, midPoint)
            : binarySearch(arr, searchCb, midPoint + 1, endPoint)
    }

    // --- kick ---
    ccfg.kick ??= {
        useKickCommand: true
    }

    const alert = (msg: string) => {
        sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r ${msg}`)
        log.add('alert', '§a[Admins]§r', '§a[System]§r', msg)
    }

    const warn = (plr: Player, moderator: Player | string = '§a[System]§r', msg: string) => {
        plr.sendMsg(`§eYou have been warned §8-§r ${msg}`)
        sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r §b${typeof moderator == 'string' ? moderator : moderator.name}§r §gwarned§r §b${plr.name}§r: ${msg}`)
        log.add('warn', plr, moderator, msg)
    }

    const kick = (plr: Player, messsage: string | string[] | kickConfig) => {
        const {
            useTemplate = true,
            type = 'kick',
            banDuration = 0,
            moderator = '§a[System]§r',
            reason = 'N/A',
            announceLevel = 'admin',
            announceMessage = '',
            writeLog = announceLevel != 'none'
        }: kickConfig = typeof messsage == 'string' ? { reason: messsage }
            : Array.isArray(messsage) ? { useTemplate: false, reason: messsage.join('\n§r') }
            : messsage

        // registry for ban & blacklist
        if (type == 'ban') bancfg[plr.uid] = Date.now() + banDuration * 1000
        if (type == 'blacklist') blcfg[plr.uid] = plr.uid

        // kick message
        const kickType = type == 'blacklist' ? '§4blacklisted§r' : type == 'ban' ? '§cbanned§r' : '§ekicked§r', 
            modName = typeof moderator == 'string' ? moderator : moderator.name,
            aa = `from${ type != 'kick' ? ' playing in ' : ' ' }this server${ type == 'ban' ? ` for §a${convertToReadableTime(banDuration, false)}§r and will expire on §a${ new Date(Date.now() + banDuration * 1000) }§r` : '' }`
        
        // kick announce
        if (announceLevel != 'none') {
            const announceMessageConvert = announceMessage || `§6[§eHEXA§6]§r §b${modName}§r ${kickType} §b${plr.name}§r ${aa}: ${reason}`
            if (announceLevel == 'admin') sendMsgToPlayers(getAdmins(), announceMessageConvert)
            else sendMsg('@a', announceMessageConvert)
        }

        // write log
        if (writeLog) log.add(type, plr, moderator, reason, banDuration)
        
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
        getAdmins,
        parseTimeFormat,
        binarySearch
    }
}

export type libs_misc = ReturnType<typeof aa>
