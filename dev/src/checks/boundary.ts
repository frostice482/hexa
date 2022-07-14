import type { Player } from "mojang-minecraft";
import type Area from "../../types/se/area.js";
import { config_common } from "../configs/common.js";
import { config_hardboundary } from "../configs/hardboundary.js";
import { config_worldboundary } from "../configs/worldboundary.js";
import { libs_misc } from "../libs/misc.js";
import { libs_module } from "../libs/module.js";
import pli from "../pli.js";
import { pos3, sign } from "./combat.js";

pli.internalModules['checks/boundary'] = async (b) => {
    const { permission, Area } = await b.import('se')
    const { world } = await b.import('mc')
    const ccfg = await b.importInternal('configs/common') as Awaited<config_common>
    const hbcfg = await b.importInternal('configs/hardboundary') as Awaited<config_hardboundary>
    const wbcfg = await b.importInternal('configs/worldboundary') as Awaited<config_worldboundary>
    const { alert, warn, kick } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = new Module('boundary', 'Boundary', true)

    const cfg = ccfg.boundary ??= {
        checkInterval: 1,
        padding: 3,
        hardBoundary: {
            enabled: true,
            actionType: 'ban',
        }
    }

    const tp = (area: Area, plr: Player) => {
        const loc = plr.location, locArr = Area.toLocationArray(loc)
        const tpLoc = Area.toLocation(area.getClosestLocation(locArr))

        const [xs, ys, zs] = area.getClosestAxisDistance(locArr).map(Math.sign) as pos3<sign>
        tpLoc.x += xs * cfg.padding
        tpLoc.y += ys * cfg.padding
        tpLoc.z += zs * cfg.padding

        plr.teleport(tpLoc, plr.dimension, plr.rotation.x, plr.rotation.y)
    }

    const aa = world.events.tick.subscribe(({currentTick}) => {
        for (const plr of world.getPlayers()) {
            if (permission.getLevel(plr.getTags()) >= 60) continue

            const locArr = Area.toLocationArray(plr.location)

            if (cfg.hardBoundary.enabled && !hbcfg.isInside(locArr)) {
                const info = `§8(at ${ locArr.map(v => `§a${Math.floor(v)}§8`).join(', ') } (§a${plr.dimension.id}§8))`
                tp(wbcfg, plr)

                switch (cfg.hardBoundary.actionType) {
                    case 'alert':
                        alert(`§b${plr.name}§r is §coutside hard boundary§r! ${info}`)
                        break

                    case 'warn':
                        warn(plr, undefined, `You are §coutside hard boundary§r! ${info}`)
                        break

                    case 'kick':
                        kick(plr, `§cOutside Hard Boundary§r ${info}`)
                        continue

                    case 'ban':
                        kick(plr, {
                            type: 'ban',
                            banDuration: ccfg.ban.defaultDuration,
                            reason: `§cOutside Hard Boundary§r ${info}`
                        })
                        continue

                    case 'blacklist':
                        kick(plr, {
                            type: 'blacklist',
                            reason: `§cOutside Hard Boundary§r ${info}`
                        })
                        continue
                }
            }

            if (currentTick % cfg.checkInterval !== 0) continue

            if (!wbcfg.isInside(locArr)) tp(wbcfg, plr)
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
