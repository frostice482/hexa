import { config_common } from "../configs/common.js";
import { libs_misc } from "../libs/misc.js";
import { libs_module } from "../libs/module.js";
import pli from "../pli.js";

pli.internalModules['checks/gamemode'] = async (b) => {
    const { permission, execCmd } = await b.import('se')
    const { world, EntityQueryOptions } = await b.import('mc')
    const ccfg = await b.importInternal('configs/common') as Awaited<config_common>
    const { alert, warn, kick } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = new Module('gamemode', 'Gamemode', true)

    const cfg = ccfg.gamemode ??= {
        survival: {
            enabled: false,
            actionType: 'warn',
            setTo: 'adventure'
        },
        creative: {
            enabled: true,
            actionType: 'warn',
            setTo: 'survival'
        },
        adventure: {
            enabled: false,
            actionType: 'warn',
            setTo: 'survival'
        },
        spectator: {
            enabled: true,
            actionType: 'warn',
            setTo: 'survival'
        },
        checkInterval: 1
    }

    const gamemodes: { gm: 'survival' | 'creative' | 'adventure' | 'spectator', code: number }[] = [
        { gm: 'survival', code: 0 },
        { gm: 'creative', code: 1 },
        { gm: 'adventure', code: 2 },
        { gm: 'spectator', code: 6 }
    ]

    const aa = world.events.tick.subscribe(({currentTick}) => {
        if (currentTick % cfg.checkInterval !== 0) return
        for (const { gm, code } of gamemodes) {
            const gcfg = cfg[gm]
            if (!gcfg.enabled) continue

            const opts = new EntityQueryOptions
            opts.gameMode = code

            const exclude: string[] = gcfg.exclude ? ( execCmd(`testfor ${gcfg.exclude}`, 'o', true).victim ?? [] ) : []

            for (const plr of world.getPlayers(opts)) {
                if ( exclude.includes(plr.name) || permission.getLevel(plr.getTags()) >= 60 ) continue

                execCmd(`gamemode ${gcfg.setTo}`, plr)
                const info = `§8(gm: §2${gm}§8)`

                switch (gcfg.actionType) {
                    case 'alert':
                        alert(`§b${plr.name}§r has §cillegal gamemode§r! ${info}`)
                        break

                    case 'warn':
                        warn(plr, undefined, `You have §cillegal gamemode§r! ${info}`)
                        break

                    case 'kick':
                        kick(plr, `§cIllegal Gamemode§r ${info}`)
                        continue

                    case 'ban':
                        kick(plr, {
                            type: 'ban',
                            banDuration: ccfg.ban.defaultDuration,
                            reason: `§cIllegal Gamemode§r ${info}`
                        })
                        continue

                    case 'blacklist':
                        kick(plr, {
                            type: 'blacklist',
                            reason: `§cIllegal Gamemode§r ${info}`
                        })
                        continue
                }
            }
        }
    })
    if (!module.toggle) world.events.tick.unsubscribe(aa)

    // switch event listeners
    const ad = module.ev.enable.subscribe(() => {
        world.events.tick.subscribe(aa)
    })

    const ae = module.ev.disable.subscribe(() => {
        world.events.tick.unsubscribe(aa)
    })

    const af = b.ev.unload.subscribe(() => {
        ae()
        module.ev.enable.unsubscribe(ad)
        module.ev.disable.unsubscribe(ae)
        b.ev.unload.unsubscribe(af)
    })
}
