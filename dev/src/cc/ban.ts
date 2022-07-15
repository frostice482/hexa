import cc from "../../types/se/cc.js";
import { config_banlist } from "../configs/banlist.js";
import { config_id } from "../configs/id.js";
import { config_log } from "../configs/log.js";
import { libs_misc } from "../libs/misc.js";
import pli from "../pli.js";

type sel = ReturnType<typeof cc.parser.playerSelector>

pli.internalModules['cc/ban'] = async (b) => {
    const { cc, permission, sendChat: { sendMsgToPlayers }, misc: { convertToReadableTime } } = await b.import('se')
    const bancfg = await b.importInternal('configs/banlist') as Awaited<config_banlist>
    const mlog = await b.importInternal('configs/log') as Awaited<config_log>
    const { uidOfName } = await b.importInternal('configs/id') as Awaited<config_id>
    const { parseTimeFormat, kick, getAdmins } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    new cc('hexa:ban', {
        minPermLvl: 80,
        triggers: /^(hexa-?)?ban$/i,
        typedArgs: new cc.typedArgs([
            { sequence: [ cc.parser.playerSelector, cc.parser.any ] }
        ]),
        onTrigger: ({ executer, log, typedArgs: tArgs, args }) => {
            const duration = parseTimeFormat(tArgs[1]) / 1000,
                reason = tArgs.slice(2).join(' ') || 'No reason'
            
            let c = 0
            for (const plr of (tArgs[0] as sel).execute(executer)) {
                if (permission.getLevel(plr.getTags()) >= 60) {
                    log(`§b${plr.name}§r is a moderator. You cannot ban them.`)
                    continue
                }
                if (plr == executer) {
                    log(`You cannot ban yourself.`)
                    continue
                }

                c++
                kick(plr, {
                    type: 'ban',
                    banDuration: duration,
                    moderator: executer,
                    reason
                })
            }
            if (c == 0) {
                const name = args[0]
                const uid = uidOfName[name]
                if (!uid) throw new cc.error(`Player not found: ${name}`, 'ReferenceError')

                bancfg[uid] = Date.now() + duration * 1000
                sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r §b${executer.name}§r §cbanned§r §b${name}§r §7(offline)§r from playing in this server for §a${convertToReadableTime(duration, false)}§r: ${reason}`)
                mlog.add('ban', name, executer, reason, duration)
                return log(`Banned §b${name}§r.`)
            }
            else log(`Banned ${c} player${c == 1 ? '' : 's'}.`)
        },
        isDefault: true
    })

    const ad = b.ev.unload.subscribe(() => {
        cc.delete('hexa:ban')
        b.ev.unload.unsubscribe(ad)
    })
}
