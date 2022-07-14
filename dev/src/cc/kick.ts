import cc from "../../types/se/cc.js";
import { libs_misc } from "../libs/misc.js";
import pli from "../pli.js";

type sel = ReturnType<typeof cc.parser.playerSelector>

pli.internalModules['cc/kick'] = async (b) => {
    const { cc, permission } = await b.import('se')
    const { kick } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    new cc('hexa:kick', {
        minPermLvl: 60,
        triggers: /^(hexa-?)?kick$/i,
        typedArgs: new cc.typedArgs([
            { sequence: [ cc.parser.playerSelector ] }
        ]),
        onTrigger: ({ executer, log, typedArgs: tArgs }) => {
            const reason = tArgs.slice(1).join(' ') || 'No reason'
            
            let c = 0
            for (const plr of (tArgs[0] as sel).execute(executer)) {
                if (permission.getLevel(plr.getTags()) >= 60) {
                    log(`§b${plr.name}§r is a moderator. You cannot kick them.`)
                    continue
                }
                if (plr == executer) {
                    log(`You cannot kick yourself.`)
                    continue
                }
                
                c++
                kick(plr, {
                    type: 'kick',
                    moderator: executer,
                    reason
                })
            }
            if (c == 0) log(`§eNo players have been kicked.`)
            else log(`Kicked ${c} player${c == 1 ? '' : 's'}.`)
        },
        isDefault: true
    })

    const ad = b.ev.unload.subscribe(() => {
        cc.delete('hexa:kick')
        b.ev.unload.unsubscribe(ad)
    })
}
