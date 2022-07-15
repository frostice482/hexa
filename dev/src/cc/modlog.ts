import { config_log } from "../configs/log.js";
import pli from "../pli.js";

pli.internalModules['cc/modlog'] = async (b) => {
    const { cc } = await b.import('se')
    const mlog = await b.importInternal('configs/log') as Awaited<config_log>

    const actionDisplay = {
        report: '§ereported§r',
        alert: '§ealerted§r',
        warn: '§gwarned§r',
        kick: '§ekicked§r',
        ban: '§cbanned§r',
        blacklist: '§4blacklisted§r',
    }

    new cc('hexa:modlog', {
        minPermLvl: 60,
        triggers: /^(hexa-?)?(moderation-?)?log$/i,
        typedArgs: new cc.typedArgs([
            { minArgs: 1, sequence: ['list', cc.parser.number, cc.parser.number] }
        ]),
        onTrigger: ({ log, typedArgs: tArgs }) => {
            switch (tArgs[0]) {
                case 'list': {
                    const logPerPage = tArgs[2] ?? 20,
                        maxPage = Math.max( Math.ceil(mlog.size / logPerPage), 1 ),
                        page = Math.max( Math.min( tArgs[1] ?? 1, maxPage ), 1 )
                    return log([
                        ` `,
                        `Moderation log: §7(showing page ${page} of ${maxPage})`,
                        ...Array.from( mlog.iterate(logPerPage, (page - 1) * logPerPage), v => `§8:§r §a#${v.i}§r §b${v.moderator}§r ${actionDisplay[v.type] ?? v.type} §b${v.player}§r §8-§r ${v.message}` ),
                        ` `
                    ])
                }
            }
        },
        isDefault: true
    })

    const ad = b.ev.unload.subscribe(() => {
        cc.delete('hexa:modlog')
        b.ev.unload.unsubscribe(ad)
    })
}
