import type { Player } from "mojang-minecraft"
import { config_banlist } from "../configs/banlist.js"
import { config_common } from "../configs/common.js"
import { libs_misc } from "../libs/misc.js"
import { libs_module } from "../libs/module.js"
import pli from "../pli.js"

export type pos3<T = number> = [T, T, T]
export type pos2<T = number> = [T, T]
export type sign = 1 | 0 | -1
export type axisPos = 0 | 1 | 2

const aa = pli.internalModules['checks/combat:kaCalc'] = (b) => {
    const deg = Math.PI / 180
    const kaDefs: { [x in sign]: { [y in sign]: { [z in sign]: { pos: [x, y, z], h: { min: pos2<1 | 0>, max: pos2<1 | 0> }, v: { min: pos3<axisPos>, max: pos3<axisPos> } } } } } = {
        0: {
            0: {
                0: null,
                1: {
                    pos: [0, 0, 1],
                    h: {
                        min: [1, 0],
                        max: [0, 0]
                    },
                    v: {
                        min: [2, 0, 0],
                        max: [2, 1, 0]
                    }
                },
                [-1]: {
                    pos: [0, 0, -1],
                    h: {
                        min: [0, 1],
                        max: [1, 1]
                    },
                    v: {
                        min: [2, 0, 1],
                        max: [2, 1, 1]
                    }
                }
            },
            1: {
                0: null,
                1: {
                    pos: [0, 1, 1],
                    h: {
                        min: [1, 0],
                        max: [0, 0]
                    },
                    v: {
                        min: [2, 0, 1],
                        max: [2, 1, 0]
                    }
                },
                [-1]: {
                    pos: [0, 1, -1],
                    h: {
                        min: [0, 1],
                        max: [1, 1]
                    },
                    v: {
                        min: [2, 0, 0],
                        max: [2, 1, 1]
                    }
                }
            },
            [-1]: {
                0: null,
                1: {
                    pos: [0, -1, 1],
                    h: {
                        min: [1, 0],
                        max: [0, 0]
                    },
                    v: {
                        min: [2, 0, 0],
                        max: [2, 1, 1]
                    }
                },
                [-1]: {
                    pos: [0, -1, -1],
                    h: {
                        min: [0, 1],
                        max: [1, 1]
                    },
                    v: {
                        min: [2, 0, 1],
                        max: [2, 1, 0]
                    }
                }
            }
        },
        1: {
            0: {
                0: {
                    pos: [1, 0, 0],
                    h: {
                        min: [0, 0],
                        max: [0, 1]
                    },
                    v: {
                        min: [0, 0, 2],
                        max: [0, 1, 2]
                    }
                },
                1: {
                    pos: [1, 0, 1],
                    h: {
                        min: [1, 0],
                        max: [0, 1]
                    },
                    v: {
                        min: [0, 0, 0],
                        max: [0, 1, 0]
                    }
                },
                [-1]: {
                    pos: [1, 0, -1],
                    h: {
                        min: [0, 0],
                        max: [1, 1]
                    },
                    v: {
                        min: [0, 0, 1],
                        max: [0, 1, 1]
                    }
                }
            },
            1: {
                0: {
                    pos: [1, 1, 0],
                    h: {
                        min: [0, 0],
                        max: [0, 1]
                    },
                    v: {
                        min: [1, 0, 2],
                        max: [0, 1, 2]
                    }
                },
                1: {
                    pos: [1, 1, 1],
                    h: {
                        min: [1, 0],
                        max: [0, 1]
                    },
                    v: {
                        min: [1, 0, 1],
                        max: [0, 1, 0]
                    }
                },
                [-1]: {
                    pos: [1, 1, -1],
                    h: {
                        min: [0, 0],
                        max: [1, 1]
                    },
                    v: {
                        min: [1, 0, 0],
                        max: [0, 1, 1]
                    }
                }
            },
            [-1]: {
                0: {
                    pos: [1, -1, 0],
                    h: {
                        min: [0, 0],
                        max: [0, 1]
                    },
                    v: {
                        min: [0, 0, 2],
                        max: [1, 1, 2]
                    }
                },
                1: {
                    pos: [1, -1, 1],
                    h: {
                        min: [1, 0],
                        max: [0, 1]
                    },
                    v: {
                        min: [0, 0, 0],
                        max: [1, 1, 1]
                    }
                },
                [-1]: {
                    pos: [1, -1, -1],
                    h: {
                        min: [0, 0],
                        max: [1, 1]
                    },
                    v: {
                        min: [0, 0, 1],
                        max: [1, 1, 0]
                    }
                }
            }
        },
        [-1]: {
            0: {
                0: {
                    pos: [-1, 0, 0],
                    h: {
                        min: [1, 1],
                        max: [1, 0]
                    },
                    v: {
                        min: [1, 0, 2],
                        max: [1, 1, 2]
                    }
                },
                1: {
                    pos: [-1, 0, 1],
                    h: {
                        min: [1, 1],
                        max: [0, 0]
                    },
                    v: {
                        min: [1, 0, 0],
                        max: [1, 1, 0]
                    }
                },
                [-1]: {
                    pos: [-1, 0, -1],
                    h: {
                        min: [0, 1],
                        max: [1, 0]
                    },
                    v: {
                        min: [1, 0, 1],
                        max: [1, 1, 1]
                    }
                }
            },
            1: {
                0: {
                    pos: [-1, 1, 0],
                    h: {
                        min: [1, 1],
                        max: [1, 0]
                    },
                    v: {
                        min: [0, 0, 2],
                        max: [1, 1, 2]
                    }
                },
                1: {
                    pos: [-1, 1, 1],
                    h: {
                        min: [1, 1],
                        max: [0, 0]
                    },
                    v: {
                        min: [0, 0, 1],
                        max: [1, 1, 0]
                    }
                },
                [-1]: {
                    pos: [-1, 1, -1],
                    h: {
                        min: [0, 1],
                        max: [1, 0]
                    },
                    v: {
                        min: [0, 0, 0],
                        max: [1, 1, 1]
                    }
                }
            },
            [-1]: {
                0: {
                    pos: [-1, -1, 0],
                    h: {
                        min: [1, 1],
                        max: [1, 0]
                    },
                    v: {
                        min: [1, 0, 2],
                        max: [0, 1, 2]
                    }
                },
                1: {
                    pos: [-1, -1, 1],
                    h: {
                        min: [1, 1],
                        max: [0, 0]
                    },
                    v: {
                        min: [1, 0, 0],
                        max: [0, 1, 1]
                    }
                },
                [-1]: {
                    pos: [-1, -1, -1],
                    h: {
                        min: [0, 1],
                        max: [1, 0]
                    },
                    v: {
                        min: [1, 0, 1],
                        max: [0, 1, 0]
                    }
                }
            }
        }
    }
    return (
        [x1, y1, z1]: pos3,
        [x2, y2, z2]: pos3,
        [x, y, z]: pos3,
        [xs, ys, zs]: pos3<sign>,
    ): {
        h: pos2,
        v: pos2
    } => {
        const data = kaDefs[xs][ys][zs]
        if (!data) {
            if (ys == 0) return {
                h: [-180, 180],
                v: [-90, 90]
            }
            return {
                h: [-180, 180],
                v: ys == 1 ? [
                    -90,
                    Math.max(
                        -Math.atan2( y1 - y, Math.hypot( x - x1, z - z1 ) ) / deg,
                        -Math.atan2( y1 - y, Math.hypot( x - x1, z2 - z ) ) / deg,
                        -Math.atan2( y1 - y, Math.hypot( x2 - x, z - z1 ) ) / deg,
                        -Math.atan2( y1 - y, Math.hypot( x2 - x, z2 - z ) ) / deg,
                    ),
                ] : [
                    Math.min(
                        -Math.atan2( y2 - y, Math.hypot( x - x1, z - z1 ) ) / deg,
                        -Math.atan2( y2 - y, Math.hypot( x - x1, z2 - z ) ) / deg,
                        -Math.atan2( y2 - y, Math.hypot( x2 - x, z - z1 ) ) / deg,
                        -Math.atan2( y2 - y, Math.hypot( x2 - x, z2 - z ) ) / deg,
                    ),
                    90
                ]
            }
        }
        const xa: pos3 = [x1, x2, x],
            ya: pos3 = [y1, y2, y],
            za: pos3 = [z1, z2, z]
        const { h: { min: h1, max: h2 }, v: { min: v1, max: v2 } } = data
        return {
            h: [
                -Math.atan2( xa[h1[0]] - x, za[h1[1]] - z ) / deg,
                -Math.atan2( xa[h2[0]] - x, za[h2[1]] - z ) / deg
            ],
            v: [
                -Math.atan2( ya[v2[1]] - y, Math.hypot( xa[v2[0]] - x, za[v2[2]] - z ) ) / deg,
                -Math.atan2( ya[v1[1]] - y, Math.hypot( xa[v1[0]] - x, za[v1[2]] - z ) ) / deg,
            ]
        }
    }
}

type kaCalc = ReturnType<typeof aa>

pli.internalModules['checks/combat'] = async (b) => {
    const { Area, permission, server, sendChat: { sendMsgToPlayers } } = await b.import('se')
    const { world, Player } = await b.import('mc')
    const kaCalc = await b.importInternal('checks/combat:kaCalc') as kaCalc
    const bancfg = await b.importInternal('configs/banlist') as Awaited<config_banlist>
    const ccfg = await b.importInternal('configs/common') as Awaited<config_common>
    const { getAdmins, kick } = await b.importInternal('libs/misc') as Awaited<libs_misc>
    
    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = new Module('combat', 'Combat', true)

    const cfg = ccfg.combat ??= {
        killaura: {
            check: true,
            tolerance: [0, 0],
            actionThresholds: {
                warn: 3,
                kick: 0,
                ban: 6,
            }
        },
        reach: {
            check: true,
            threshold: 4,
            actionThresholds: {
                warn: 3,
                kick: 0,
                ban: 6
            }
        },
        autoclicker: {
            check: true,
            threshold: 20,
            actionThresholds: {
                warn: 3,
                kick: 0,
                ban: 6
            }
        },
        vcCooldownInterval: 2000,
        banDuration: 31449600
    }

    const aa = world.events.entityHit.subscribe(({entity: plr, hitEntity: target}) => {
        if (!( plr instanceof Player && target instanceof Player )) return

        const ctime = Date.now()

        if (!vcList.has(plr)) vcList.set(plr, {
            killaura: { count: 0 },
            reach: { count: 0 },
            autoclicker: {
                count: 0,
                lastHitTime: ctime - 1000,
                cpsArr: []
            }
        })
        const pdata = vcList.get(plr)

        const targetLocArr = Area.toLocationArray(target.location)
        const targetHitbox = new Area(
            [ targetLocArr[0] - 0.4, targetLocArr[1] + 0.0, targetLocArr[2] - 0.4 ],
            [ targetLocArr[0] + 0.4, targetLocArr[1] + 1.8, targetLocArr[2] + 0.4 ]
        )

        const plrLocArr = Area.toLocationArray(plr.headLocation)
        plrLocArr[1] += 0.1

        // killaura detection
        if (cfg.killaura.check) {
            let { h: [hMin, hMax], v: [vMin, vMax] } = kaCalc( targetHitbox.from, targetHitbox.to, plrLocArr, targetHitbox.getClosestAxisDistance(plrLocArr).map(Math.sign) as pos3<sign> )
            const { y: hRot, x: vRot } = plr.rotation
            const [hTol, vTol] = cfg.killaura.tolerance

            hMin -= hTol
            hMax += hTol
            vMin -= vTol
            vMax += vTol
    
            if (!( ( vMin <= vRot && vRot <= vMax ) && ( hMin < hMax ? hMin <= hRot && hRot <= hMax : hMin <= hRot || hRot <= hMax ) )) {
                pdata.killaura.count++

                const info = `§7Combat§8:§cKillaura§r`

                if (cfg.killaura.actionThresholds.ban && pdata.killaura.count > cfg.killaura.actionThresholds.ban) {
                    bancfg[plr.uid] = Date.now() + cfg.banDuration * 1000
                    kick(plr, {
                        type: 'ban',
                        banDuration: cfg.banDuration,
                        reason: info
                    })
                    vcList.delete(plr)
                    return
                }
                if (cfg.killaura.actionThresholds.kick && pdata.killaura.count > cfg.killaura.actionThresholds.kick) {
                    kick(plr, info)
                    vcList.delete(plr)
                    return
                }
                if (cfg.killaura.actionThresholds.warn && pdata.killaura.count > cfg.killaura.actionThresholds.warn) {
                    sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r §b${plr.name}§r has ${info}`)
                }
            }
        }

        // reach detection
        if (cfg.reach.check) {
            const dist = targetHitbox.getClosestDistance(targetLocArr)
            if (dist > cfg.reach.threshold) {
                pdata.reach.count++

                const info = `§7Combat§8:§cReach§r §8(dist: §2${dist.toFixed(2)}bl§8)`

                if (cfg.reach.actionThresholds.ban && pdata.reach.count > cfg.reach.actionThresholds.ban) {
                    bancfg[plr.uid] = Date.now() + cfg.banDuration * 1000
                    kick(plr, {
                        type: 'ban',
                        banDuration: cfg.banDuration,
                        reason: info
                    })
                    vcList.delete(plr)
                    return
                }
                if (cfg.reach.actionThresholds.kick && pdata.reach.count > cfg.reach.actionThresholds.kick) {
                    kick(plr, info)
                    vcList.delete(plr)
                    return
                }
                if (cfg.reach.actionThresholds.warn && pdata.reach.count > cfg.reach.actionThresholds.warn) {
                    sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r §b${plr.name}§r has ${info}`)
                }
            }
        }

        // autoclicker detection
        if (cfg.autoclicker.check) {
            const cpsdata = pdata.autoclicker

            const cps = Math.min( 1000 / (ctime - cpsdata.lastHitTime), 1000)
            cpsdata.lastHitTime = ctime

            const cpsArr = cpsdata.cpsArr
            cpsArr.push(cps)
            cpsArr.splice(0, Math.max( Math.min( cpsArr.length - cps, cpsArr.length - 1 ), 0 ))

            const avg = cpsArr.reduce((a, b) => a + b, 0) / cpsArr.length,
                max = Math.max(...cpsArr)

            if (avg > cfg.autoclicker.threshold) {
                pdata.autoclicker.count++

                const info = `§7Combat§8:§cAutoclicker§r §8(avg ${cpsArr.length}: §2${avg.toFixed(2)}cps§8, max ${cpsArr.length}: §2${max.toFixed(2)}cps§8)`

                if (cfg.autoclicker.actionThresholds.ban && pdata.autoclicker.count > cfg.autoclicker.actionThresholds.ban) {
                    bancfg[plr.uid] = Date.now() + cfg.banDuration * 1000
                    kick(plr, {
                        type: 'ban',
                        banDuration: cfg.banDuration,
                        reason: info
                    })
                    vcList.delete(plr)
                    return
                }
                if (cfg.autoclicker.actionThresholds.kick && pdata.autoclicker.count > cfg.autoclicker.actionThresholds.kick) {
                    kick(plr, info)
                    vcList.delete(plr)
                    return
                }
                if (cfg.autoclicker.actionThresholds.warn && pdata.autoclicker.count > cfg.autoclicker.actionThresholds.warn) {
                    sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r §b${plr.name}§r has ${info}`)
                }
            }
        }
    })
    if (!module.toggle) world.events.entityHit.unsubscribe(aa)

    // violence count

    const vcList = new Map<Player, {
        killaura: {
            count: number
        }
        reach: {
            count: number
        }
        autoclicker: {
            count: number
            lastHitTime: number
            cpsArr: number[]
        }
    }>()

    const clearInterval = new server.interval(() => {
        for (const [plr, vcData] of vcList) {
            vcData.autoclicker.count = Math.max(vcData.autoclicker.count - 1, 0)
            vcData.killaura.count = Math.max(vcData.killaura.count - 1, 0)
            vcData.reach.count = Math.max(vcData.reach.count - 1, 0)

            if ( vcData.autoclicker.count <= 0 && vcData.killaura.count <= 0 && vcData.reach.count <= 0 ) vcList.delete(plr)
        }
    }, cfg.vcCooldownInterval)

    Object.defineProperty(cfg, 'vcCooldownInterval', {
        get: () => clearInterval.interval,
        set: (v) => clearInterval.interval = v
    })

    // switch event listeners
    const ad = module.ev.enable.subscribe(() => {
        world.events.entityHit.subscribe(aa)
    })

    const ae = module.ev.disable.subscribe(() => {
        world.events.entityHit.unsubscribe(aa)
    })

    const af = b.ev.unload.subscribe(() => {
        ae()
        module.ev.enable.unsubscribe(ad)
        module.ev.disable.unsubscribe(ae)
        b.ev.unload.unsubscribe(af)
    })
}
