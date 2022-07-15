import cc from "../../types/se/cc.js";
import { config_blacklist } from "../configs/blacklist.js";
import { config_id } from "../configs/id.js";
import { libs_misc } from "../libs/misc.js";
import { libs_module } from "../libs/module.js";
import pli from "../pli.js";

type sel = ReturnType<typeof cc.parser.playerSelector>

pli.internalModules['cc/blacklist'] = async (b) => {
    const { cc, permission } = await b.import('se')
    const { config: blcfg, scoreboard: blsb } = await b.importInternal('configs/blacklist') as Awaited<config_blacklist>
    const { nameOfUid, uidOfName } = await b.importInternal('configs/id') as Awaited<config_id>
    const { kick } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = Module.get('blacklist')

    new cc('hexa:blacklist', {
        minPermLvl: 80,
        triggers: /^(hexa-?)?(blacklist|bl)$/i,
        typedArgs: new cc.typedArgs([
            { sequence: [ cc.parser.switch ] },
            { sequence: [ 'list' ] },
            { sequence: [ 'add', cc.parser.playerSelector ] },
            { sequence: [ 'remove', cc.parser.any ] },
        ]),
        onTrigger: ({ executer, log, typedArgs: tArgs }) => {
            switch (tArgs[0]) {
                case 'add': {
                    const reason = tArgs.slice(2).join(' ') || 'No reason'
            
                    let c = 0
                    for (const plr of (tArgs[1] as sel).execute(executer)) {
                        if (permission.getLevel(plr.getTags()) >= 60) {
                            log(`§b${plr.name}§r is a moderator. You cannot blacklist them.`)
                            continue
                        }
                        if (plr == executer) {
                            log(`You cannot blacklist yourself.`)
                            continue
                        }
                        
                        c++
                        kick(plr, {
                            type: 'blacklist',
                            moderator: executer,
                            reason
                        })
                    }
                    if (c == 0) log(`§eNo players have been blacklisted.`)
                    else log(`Blacklisted ${c} player${c == 1 ? '' : 's'}.`)
                }; break
                
                case 'remove': {
                    const puid = uidOfName[tArgs[1]]
                    if (!(puid in blcfg)) return log(`Player §b${tArgs[1]}§r is not blacklisted.`)

                    delete blcfg[puid]
                    return log(`Player §b${tArgs[1]}§r (§a${puid}§r) is no longer blacklisted.`)
                }; break

                case 'list': {
                    return log([
                        ` `,
                        `Blacklisted players:`,
                        ...Array.from(blsb.getScores(), ([n, s]) => ` §8:§r ${nameOfUid[n]}§r -> §a${n}`),
                        ` `,
                    ])
                }; break

                case true: {
                    if (module.toggle) return log(`§aBlacklist§r is currently §aenabled§r.`)
                    return module.enable(executer)
                }

                case false: {
                    if (!module.toggle) return log(`§aBlacklist§r is currently §cdisabled§r.`)
                    return module.disable(executer)
                }
            }
        },
        isDefault: true
    })

    const ad = b.ev.unload.subscribe(() => {
        cc.delete('hexa:blacklist')
        b.ev.unload.unsubscribe(ad)
    })
}
