import { config_log } from "../configs/log.js";
import { libs_misc } from "../libs/misc.js";
import pli from "../pli.js";

pli.internalModules['cc/modlog'] = async (b) => {
    const { cc, misc: { convertToReadableTime } } = await b.import('se')
    const mlog = await b.importInternal('configs/log') as Awaited<config_log>
    const { binarySearch } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const actionDisplay = {
        report: '§ereported§r',
        alert: '§ealerted§r',
        warn: '§gwarned§r',
        kick: '§ekicked§r',
        ban: '§cbanned§r',
        blacklist: '§4blacklisted§r',
    }

    const actionDisplay2 = {
        report: '§ereport§r',
        alert: '§ealert§r',
        warn: '§gwarn§r',
        kick: '§ekick§r',
        ban: '§cban§r',
        blacklist: '§4blacklist§r',
    }

    new cc('hexa:modlog', {
        minPermLvl: 60,
        triggers: /^(hexa-?)?(mod(eration)?-?)?log$/i,
        typedArgs: new cc.typedArgs([
            { minArgs: 1, sequence: ['list', cc.parser.number, cc.parser.number] },
            { sequence: [['details', 'info'], cc.parser.number] },
        ]),
        onTrigger: ({ log, typedArgs: tArgs }) => {
            switch (tArgs[0]) {
                case 'list': {
                    const logPerPage = 20,
                        maxPage = Math.max( Math.ceil(mlog.size / logPerPage), 1 ),
                        page = Math.max( Math.min( tArgs[1] ?? 1, maxPage ), 1 )
                    return log([
                        ` `,
                        `Moderation log: §7(showing logs in page ${page} of ${maxPage})`,
                        ...Array.from( mlog.iterate(logPerPage, (page - 1) * logPerPage), v => `§8:§r §a#${v.i}§r §b${v.moderator}§r ${actionDisplay[v.type] ?? v.type} §b${v.player}§r §8-§r ${v.message}` ),
                        ` `
                    ])
                }

                case 'details':
                case 'info': {
                    const i = tArgs[1]
                    const data = binarySearch(mlog.arr, ({i: ix}) => ix-i)
                    if (!data) throw new cc.error(`No log data found by ID #${i}.`, 'ReferenceError')
                    return log([
                        ` `,
                        ` §8:§r Time: ${new Date(data.timestamp).toString()}`,
                        ` §8:§r Action: ${actionDisplay2[data.type] ?? data.type}`,
                        ` §8:§r Actor: §b${data.moderator}`,
                        ` §8:§r Player: §b${data.player}`,
                        ` §8:§r Message: ${data.message}`,
                        ...( data.duration ? [ ` §8:§r Duration: §a${convertToReadableTime(data.duration, false)}` ] : [] ),
                        ` `,
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
