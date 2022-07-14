import type { BlockInventoryComponentContainer, InventoryComponentContainer, ItemStack, Player } from "mojang-minecraft";
import { config_common } from "../configs/common.js";
import { config_itemban } from "../configs/itemban.js";
import { config_maxench } from "../configs/maxench.js";
import { config_maxstack } from "../configs/maxstack.js";
import { config_renewable } from "../configs/renewable.js";
import { libs_misc } from "../libs/misc.js";
import { libs_module } from "../libs/module.js";
import pli from "../pli.js";

pli.internalModules['checks/item'] = async (b) => {
    const { permission, execCmd, Area } = await b.import('se')
    const { world, MinecraftEnchantmentTypes, ItemStack, MinecraftItemTypes, Player, EntityQueryOptions } = await b.import('mc')
    const ibcfg = await b.importInternal('configs/itemban') as Awaited<config_itemban>
    const mecfg = await b.importInternal('configs/maxench') as Awaited<config_maxench>
    const mscfg = await b.importInternal('configs/maxstack') as Awaited<config_maxstack>
    const rcfg = await b.importInternal('configs/renewable') as Awaited<config_renewable>
    const ccfg = await b.importInternal('configs/common') as Awaited<config_common>
    const { alert, warn, kick } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = new Module('illegalitem', 'IllegalItem', true)

    const cfg = ccfg.illegalItem ??= {
        checkInterval: 1,
        checkDroppedItem: true,
        checkItemBan: true,

        checkStack: true,
        defaultStackSize: 64,
        stackActionType: 'blacklist',

        checkEnch: true,
        enchActionType: 'blacklist',

        checkContainerOnPlace: true,
        nonEmptyContainerActionType: 'kick',
        nestedContainerActionType: 'blacklist',

        renewOnPlace: true
    }

    const enchList = Object.keys(MinecraftEnchantmentTypes)
    const air = new ItemStack(MinecraftItemTypes.air, 0)

    const scanItem = (plr: Player, index: number, i: ItemStack, c: BlockInventoryComponentContainer | InventoryComponentContainer = plr.getComponent('inventory').container): 0 | 1 | 2 => {
        // check item ban
        if ( cfg.checkItemBan && i.id in ibcfg && ( i.data in ibcfg[i.id].data || -1 in ibcfg[i.id].data ) ) {
            c.setItem(index, air)
            const info = `§8(Item: §2${i.id}§8, data: §2${i.data}§8)`
            switch (ibcfg[i.id].action) {
                case 'alert':
                    alert(`§b${plr.name}§r has a §cbanned item§r! ${info}`)
                    break

                case 'warn':
                    warn(plr, undefined, `You have a §cbanned item§r! ${info}`)
                    break

                case 'kick':
                    kick(plr, `§cBanned Item§r ${info}`)
                    return 2

                case 'ban':
                    kick(plr, {
                        type: 'ban',
                        banDuration: ccfg.ban.defaultDuration,
                        reason: `§cBanned Item§r ${info}`
                    })
                    return 2

                case 'blacklist':
                    kick(plr, {
                        type: 'blacklist',
                        reason: `§cBanned Item§r ${info}`
                    })
                    return 2
            }
            return 1
        }

        // check stack
        if ( cfg.checkStack && ( i.amount < 0 || i.amount > ( mscfg[i.id] ?? cfg.defaultStackSize ) ) ) {
            c.setItem(index, air)
            const info = `§8(Item: §2${i.id}§8, stack: §2${i.amount}§8, maximum: §2${mscfg[i.id] ?? cfg.defaultStackSize}§8)`
            switch (cfg.stackActionType) {
                case 'alert':
                    alert(`§b${plr.name}§r has an item with §cillegal stack size§r! ${info}`)
                    break

                case 'warn':
                    warn(plr, undefined, `You have an item with §cillegal stack size§r! ${info}`)
                    break

                case 'kick':
                    kick(plr, `§cIllegal Stack Size§r ${info}`)
                    return 2

                case 'ban':
                    kick(plr, {
                        type: 'ban',
                        banDuration: ccfg.ban.defaultDuration,
                        reason: `§cIllegal Stack Size§r ${info}`
                    })
                    return 2

                case 'blacklist':
                    kick(plr, {
                        type: 'blacklist',
                        reason: `§cIllegal Stack Size§r ${info}`
                    })
                    return 2
            }
            return 1
        }

        // check enchantment
        if ( cfg.checkEnch ) {
            const e = i.getComponent('enchantments').enchantments
            const slotMaxLevel = mecfg.slotCompatibleEnchantments[e.slot]
            for (const { level, type: { id } } of e) {
                const maxLevel = slotMaxLevel[id] ?? 0
                if ( level < 0 || level > maxLevel) {
                    c.setItem(index, air)
                    const info = `§8(Item: §2${i.id}§8, enchantment: §2${id}§8, level: §2${level}§8, maximum: §2${maxLevel}§8)`
                    switch (cfg.enchActionType) {
                        case 'alert':
                            alert(`§b${plr.name}§r has an item with §cillegal enchantment level§r! ${info}`)
                            break
        
                        case 'warn':
                            warn(plr, undefined, `You have an item with §cillegal enchantment level§r! ${info}`)
                            break
        
                        case 'kick':
                            kick(plr, `§cIllegal Enchantment Level§r ${info}`)
                            return 2
        
                        case 'ban':
                            kick(plr, {
                                type: 'ban',
                                banDuration: ccfg.ban.defaultDuration,
                                reason: `§cIllegal Enchantment Level§r ${info}`
                            })
                            return 2
        
                        case 'blacklist':
                            kick(plr, {
                                type: 'blacklist',
                                reason: `§cIllegal Enchantment Level§r ${info}`
                            })
                            return 2
                    }
                    return 1
                }
            }
        }

        return 0
    }

    const scan = (plr: Player, c = plr.getComponent('inventory').container, start = 0, end = c.size) => {
        for (let index = start; index < end; index++) {
            const i = c.getItem(index)
            if (!i) continue
            if (scanItem(plr, index, i, c) == 2) break
        }
    }

    const aa = world.events.tick.subscribe(({currentTick}) => {
        if (currentTick % cfg.checkInterval !== 0) return

        for (const plr of world.getPlayers()) {
            if (permission.getLevel(plr.getTags()) >= 60) continue
            scan(plr)
        }
    })
    if (!module.toggle) world.events.tick.unsubscribe(aa)

    const ab = world.events.beforeItemUseOn.subscribe((evd) => {
        const { source: plr, item } = evd
        if (!( plr instanceof Player && item && permission.getLevel(plr.getTags()) < 60 )) return

        if (scanItem(plr, plr.selectedSlot, item) != 0) evd.cancel = true
    })
    if (!module.toggle) world.events.beforeItemUse.unsubscribe(ab)

    const ac = world.events.entityCreate.subscribe(({entity}) => {
        if (!( cfg.checkDroppedItem && entity.hasComponent('item'))) return

        const i = entity.getComponent('item').itemStack
        const closestPlrName = execCmd('testfor @p', entity, true).victim?.[0],
            [closestPlr] = closestPlrName ? world.getPlayers( Object.assign( new EntityQueryOptions, { name: closestPlrName } ) ) : []
        
        const blLoc = `${Area.toLocationArray(entity.location).map(v => `§a${Math.floor(v)}§r`).join(', ')} (§a${entity.dimension.id}§r)`,
            closestPlrInfo = `Closest player: §b${closestPlr?.name ?? '§7(unknown)'}§r`

        if ( cfg.checkItemBan && i.id in ibcfg && ( i.data in ibcfg[i.id].data || -1 in ibcfg[i.id].data ) ) {
            alert([
                `§6[§eHEXA§6]§r A §cbanned item§r has been dropped at ${blLoc}! §8(Item: §2${i.id}§8, data: §2${i.data}§8)`,
                closestPlrInfo
            ].join('\n\u00a7r'))
            entity.kill()
            return
        }

        if ( cfg.checkStack && ( i.amount < 0 || i.amount > ( mscfg[i.id] ?? cfg.defaultStackSize ) ) ) {
            alert([
                `§6[§eHEXA§6]§r An §cillegal stack size§r has been dropped at ${blLoc}! §8(Item: §2${i.id}§8, stack: §2${i.amount}§8, maximum: §2${mscfg[i.id] ?? cfg.defaultStackSize}§8)`,
                closestPlrInfo
            ].join('\n\u00a7r'))
            entity.kill()
            return
        }

        if ( cfg.checkEnch ) {
            try {
                const e = i.getComponent('enchantments').enchantments
                const slotMaxLevel = mecfg.slotCompatibleEnchantments[e.slot]
                for (const { level, type: { id } } of e) {
                    const maxLevel = slotMaxLevel[id] ?? 0
                    if ( level < 0 || level > maxLevel) {
                        alert([
                            `§6[§eHEXA§6]§r An §cillegal enchantment§r has been dropped at ${blLoc}! §8(Item: §2${i.id}§8, enchantment: §2${id}§8, level: §2${level}§8, maximum: §2${maxLevel}§8)`,
                            closestPlrInfo
                        ].join('\n\u00a7r'))
                        entity.kill()
                        return
                    }
                }
            } catch(e) {
                console.warn(e instanceof Error ? `${e}\n${e.stack}` : e)
            }
        }
    })
    if (!module.toggle) world.events.entityCreate.unsubscribe(ac)

    const ad = world.events.blockPlace.subscribe(({block, player: plr, dimension}) => {
        if (permission.getLevel(plr.getTags()) >= 60) return

        const blLocGray = `${Area.toLocationArray(block.location).map(v => `§2${Math.floor(v)}§8`).join(', ')} (§2${plr.dimension.id}§8)`

        const {x, y, z} = block

        if ( cfg.checkContainerOnPlace && block.getComponent('inventory') ) {
            const c = block.getComponent('inventory').container
            let clr = false

            itemLoop:
            for (let ix = block.id == 'minecraft:chest' || block.id == 'minecraft:trapped_chest' ? c.size - 27 : 0, m = c.size; ix < m; ix++) {
                const i = c.getItem(ix)
                if (!i) continue
                if (block.id != 'minecraft:shulker_box' && block.id != 'minecraft:undyed_shulker_box') {
                    execCmd(`tag @e[x=${x},y=${y},z=${z},dx=0,dy=0,dz=0,type=item] add _temp`, dimension, true)
                    execCmd(`setblock ${x} ${y} ${z} air 0 destroy`, dimension, true)
                    execCmd(`kill @e[x=${x},y=${y},z=${z},dx=0,dy=0,dz=0,type=item,tag=!_temp]`, dimension, true)
                    execCmd(`tag @e[x=${x},y=${y},z=${z},dx=0,dy=0,dz=0,type=item,tag=_temp] remove _temp`, dimension, true)

                    const info = `§8(at ${blLocGray})`

                    switch (cfg.nonEmptyContainerActionType) {
                        case 'alert':
                            alert(`§b${plr.name}§r placed a §cnon-empty container§r! ${info}`)
                            break
        
                        case 'warn':
                            warn(plr, undefined, `You placed a §cnon-empty container§r! ${info}`)
                            break
        
                        case 'kick':
                            kick(plr, `Placed a §cnon-empty container§r ${info}`)
                            return
        
                        case 'ban':
                            kick(plr, {
                                type: 'ban',
                                banDuration: ccfg.ban.defaultDuration,
                                reason: `Placed a §cnon-empty container§r ${info}`
                            })
                            return
        
                        case 'blacklist':
                            kick(plr, {
                                type: 'blacklist',
                                reason: `Placed a §cnon-empty container§r ${info}`
                            })
                            return
                    }
                    return
                } else {
                    if (i.id == 'minecraft:shulker_box' || i.id == 'minecraft:undyed_shulker_box') {
                        c.setItem(ix, air)

                        const info = `§8(at ${blLocGray})`

                        switch (cfg.nestedContainerActionType) {
                            case 'alert':
                                alert(`§b${plr.name}§r placed a §cnested container§r! ${info}`)
                                break
            
                            case 'warn':
                                warn(plr, undefined, `You placed a §cnested container§r! ${info}`)
                                break
            
                            case 'kick':
                                kick(plr, `Placed a §cnested container§r ${info}`)
                                break itemLoop
            
                            case 'ban':
                                kick(plr, {
                                    type: 'ban',
                                    banDuration: ccfg.ban.defaultDuration,
                                    reason: `Placed a §cnested container§r ${info}`
                                })
                                break itemLoop
            
                            case 'blacklist':
                                kick(plr, {
                                    type: 'blacklist',
                                    reason: `Placed a §cnested container§r ${info}`
                                })
                                break itemLoop
                        }
                    }
                    if (scanItem(plr, ix, i, c) == 2) {
                        clr = true
                        break itemLoop
                    }
                }
            }
            
            if (clr) execCmd(`setblock ${x} ${y} ${z} air`, dimension, true)
        } else if ( cfg.renewOnPlace && block.id in rcfg ) {
            const blockPrm = block.permutation, blockType = block.type
            execCmd(`setblock ${x} ${y} ${z} air`, dimension, true)
            block.setType(blockType)
            block.setPermutation(blockPrm)
        }
    })
    if (!module.toggle) world.events.blockPlace.unsubscribe(ad)

    // switch event listeners
    const ag = module.ev.enable.subscribe(() => {
        world.events.tick.subscribe(aa)
        world.events.beforeItemUse.subscribe(ab)
        world.events.entityCreate.subscribe(ac)
        world.events.blockPlace.subscribe(ad)
    })

    const ah = module.ev.disable.subscribe(() => {
        world.events.tick.unsubscribe(aa)
        world.events.beforeItemUse.unsubscribe(ab)
        world.events.entityCreate.unsubscribe(ac)
        world.events.blockPlace.unsubscribe(ad)
    })

    const ai = b.ev.unload.subscribe(() => {
        ah()
        module.ev.enable.unsubscribe(ag)
        module.ev.disable.unsubscribe(ah)
        b.ev.unload.unsubscribe(ai)
    })
}
