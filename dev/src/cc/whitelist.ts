import cc from "../../types/se/cc.js";
import { config_id } from "../configs/id.js";
import { config_whitelist } from "../configs/whitelist.js";
import { libs_config } from "../libs/config.js";
import { libs_module } from "../libs/module.js";
import pli from "../pli.js";

type sel = ReturnType<typeof cc.parser.playerSelector>

pli.internalModules['cc/whitelist'] = async (b) => {
    const { cc } = await b.import('se')
    const wlcfg = await b.importInternal('configs/whitelist') as Awaited<config_whitelist>
    const config = await b.importInternal('libs/config') as libs_config
    const { uidOfName } = await b.importInternal('configs/id') as Awaited<config_id>

    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = Module.get('whitelist')

    new cc('hexa:whitelist', {
        minPermLvl: 80,
        triggers: /^(hexa-?)?(whitelist|wl)$/i,
        typedArgs: new cc.typedArgs([
            { sequence: [ cc.parser.switch ] },
            { sequence: [ 'list' ] },
            { sequence: [ 'add', cc.parser.playerSelector ] },
            { sequence: [ 'remove', cc.parser.any ] },
        ]),
        onTrigger: ({ executer, log, typedArgs: tArgs, args }) => {
            switch (tArgs[0]) {
                case 'add': {
                    let c = 0
                    for (const plr of (tArgs[1] as sel).execute(executer)) {
                        c++
                        wlcfg[plr.name] = plr.uid
                        log(`Whitelisted §b${plr.name}§r.`)
                    }
                    if (c == 0) {
                        const name = args[1]
                        const uid = uidOfName[name]
                        wlcfg[name] = uid ?? -1
                        log(`Whitelisted §b${name}§r.`)
                        if (!uid) log(`§eWARNING: You are whitelisting someone that hasn't been registered. Anyone named '${name}' can enter in and be whitelisted.`)
                        return
                    }
                    else log(`Whitelisted ${c} player${c == 1 ? '' : 's'}.`)
                }; break
                
                case 'remove': {
                    if (!(tArgs[1] in wlcfg)) return log(`Player §b${tArgs[1]}§r is not whitelisted.`)

                    log(`Player §b${tArgs[1]}§r (§a${wlcfg[tArgs[1]]}§r) is no longer whitelisted.`)
                    return delete wlcfg[tArgs[1]]
                }; break

                case 'list': {
                    return log([
                        ` `,
                        `whitelisted players:`,
                        ...Array.from(wlcfg[config.scoreboard].getScores(), ([n, s]) => ` §8:§r ${n}§r -> §a${s}`),
                        ` `,
                    ])
                }; break

                case true: {
                    if (module.toggle) return log(`§aWhitelist§r is currently §aenabled§r.`)
                    return module.enable(executer)
                }

                case false: {
                    if (!module.toggle) return log(`§aWhitelist§r is currently §cdisabled§r.`)
                    return module.disable(executer)
                }
            }
        },
        isDefault: true
    })

    const ad = b.ev.unload.subscribe(() => {
        cc.delete('hexa:whitelist')
        b.ev.unload.unsubscribe(ad)
    })
}
