import cc from "../../types/se/cc.js";
import { libs_misc } from "../libs/misc.js";
import pli from "../pli.js";

type sel = ReturnType<typeof cc.parser.playerSelector>

pli.internalModules['cc/ban'] = async (b) => {
    const { cc, permission } = await b.import('se')
    const { parseTimeFormat, kick } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    new cc('hexa:ban', {
        minPermLvl: 80,
        triggers: /^(hexa-?)?ban$/i,
        typedArgs: new cc.typedArgs([
            { sequence: [ cc.parser.playerSelector, cc.parser.any ] }
        ]),
        onTrigger: ({ executer, log, typedArgs: tArgs }) => {
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
            if (c == 0) log(`§eNo players have been banned.`)
            else log(`Banned ${c} player${c == 1 ? '' : 's'}.`)
        },
        isDefault: true
    })

    const ad = b.ev.unload.subscribe(() => {
        cc.delete('hexa:ban')
        b.ev.unload.unsubscribe(ad)
    })
}
