import type { BlockInventoryComponentContainer, InventoryComponentContainer, ItemStack, Player } from "mojang-minecraft";
import { config_banlist } from "../configs/banlist.js";
import { config_blacklist } from "../configs/blacklist.js";
import { config_common } from "../configs/common.js";
import { config_itemban } from "../configs/itemban.js";
import { config_maxench } from "../configs/maxench.js";
import { config_maxstack } from "../configs/maxstack.js";
import { config_renewable } from "../configs/renewable.js";
import { libs_misc } from "../libs/misc.js";
import { libs_module } from "../libs/module.js";
import pli from "../pli.js";

pli.internalModules['checks/item'] = async (b) => {
    const { permission, sendChat: { sendMsgToPlayers }, execCmd, Area } = await b.import('se')
    const { world, MinecraftEnchantmentTypes, ItemStack, MinecraftItemTypes, Player, EntityQueryOptions } = await b.import('mc')
    const bancfg = await b.importInternal('configs/banlist') as Awaited<config_banlist>
    const blcfg = await b.importInternal('configs/blacklist') as Awaited<config_blacklist>
    const ibcfg = await b.importInternal('configs/itemban') as Awaited<config_itemban>
    const mecfg = await b.importInternal('configs/maxench') as Awaited<config_maxench>
    const mscfg = await b.importInternal('configs/maxstack') as Awaited<config_maxstack>
    const rcfg = await b.importInternal('configs/renewable') as Awaited<config_renewable>
    const ccfg = await b.importInternal('configs/common') as Awaited<config_common>
    const { kick, getAdmins } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = new Module('illegalitem', 'IllegalItem', true)

    ccfg.illegalItem ??= {
        checkInterval: 1,
        checkDroppedItem: true,
        checkItemBan: true,
        checkStack: true,
        defaultStackSize: 64,
        stackActionType: 'ban',
        checkEnch: true,
        enchActionType: 'ban',
        checkContainerOnPlace: true,
        nonEmptyContainerOnPlaceActionType: 'kick',
        renewOnPlace: true,
        banDuration: 31449600
    }

    const enchList = Object.keys(MinecraftEnchantmentTypes)
    const air = new ItemStack(MinecraftItemTypes.air, 0)

    const scanItem = (plr: Player, index: number, i: ItemStack, c: BlockInventoryComponentContainer | InventoryComponentContainer = plr.getComponent('inventory').container): 0 | 1 | 2 => {
        // check item ban
        if ( ccfg.illegalItem.checkItemBan && i.id in ibcfg && ( i.data in ibcfg[i.id].data || -1 in ibcfg[i.id].data ) ) {
            c.setItem(index, air)
            const info = `§cBanned item§r §8(Item: §2${i.id}§8, data: §2${i.data}§8)`
            switch (ibcfg[i.id].action) {
                // case 'clear': {}; break

                case 'warn': {
                    sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r §b${plr.name}§r has ${info}`)
                }; break

                case 'kick': {
                    kick(plr, info)
                    return 2
                }; break

                case 'ban': {
                    bancfg[plr.uid] = Date.now() + ccfg.illegalItem.banDuration * 1000
                    kick(plr, {
                        type: 'ban',
                        banDuration: ccfg.illegalItem.banDuration,
                        reason: info
                    })
                    return 2
                }; break

                case 'blacklist': {
                    blcfg[plr.uid] = plr.uid
                    kick(plr, {
                        type: 'blacklist',
                        reason: info
                    })
                    return 2
                }; break
            }
            return 1
        }

        // check stack
        if ( ccfg.illegalItem.checkStack && ( i.amount < 0 || i.amount > ( mscfg[i.id] ?? ccfg.illegalItem.defaultStackSize ) ) ) {
            c.setItem(index, air)
            const info = `§cIllegal stack size§r §8(Item: §2${i.id}§8, stack: §2${i.amount}§8, maximum: §2${mscfg[i.id] ?? ccfg.illegalItem.defaultStackSize}§8)`
            switch (ccfg.illegalItem.stackActionType) {
                // case 'clear': {}; break

                case 'warn': {
                    sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r §b${plr.name}§r has ${info}`)
                }; break

                case 'kick': {
                    kick(plr, info)
                    return 2
                }; break

                case 'ban': {
                    bancfg[plr.uid] = Date.now() + ccfg.illegalItem.banDuration * 1000
                    kick(plr, {
                        type: 'ban',
                        banDuration: ccfg.illegalItem.banDuration,
                        reason: info
                    })
                    return 2
                }; break

                case 'blacklist': {
                    blcfg[plr.uid] = plr.uid
                    kick(plr, {
                        type: 'blacklist',
                        reason: info
                    })
                    return 2
                }; break
            }
            return 1
        }

        // check enchantment
        if ( ccfg.illegalItem.checkEnch ) {
            const e = i.getComponent('enchantments').enchantments
            const slotMaxLevel = mecfg.slotCompatibleEnchantments[e.slot]
            for (const enchId of enchList) {
                const curLevel: number = e.hasEnchantment(MinecraftEnchantmentTypes[enchId]),
                    maxLevel = slotMaxLevel[enchId] ?? 0
                if ( curLevel < 0 || curLevel > maxLevel) {
                    c.setItem(index, air)
                    const info = `§cIllegal enchantment§r §8(Item: §2${i.id}§8, enchantment: §2${enchId}§8, level: §2${curLevel}§8, maximum: §2${maxLevel}§8)`
                    switch (ccfg.illegalItem.enchActionType) {
                        // case 'clear': {}; break

                        case 'warn': {
                            sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r §b${plr.name}§r has ${info}`)
                        }; break

                        case 'kick': {
                            kick(plr, info)
                            return 2
                        }; break

                        case 'ban': {
                            bancfg[plr.uid] = Date.now() + ccfg.illegalItem.banDuration * 1000
                            kick(plr, {
                                type: 'ban',
                                banDuration: ccfg.illegalItem.banDuration,
                                reason: info
                            })
                            return 2
                        }; break

                        case 'blacklist': {
                            blcfg[plr.uid] = plr.uid
                            kick(plr, {
                                type: 'blacklist',
                                reason: info
                            })
                            return 2
                        }; break
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
        if (currentTick % ccfg.illegalItem.checkInterval !== 0) return

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
        if (!( ccfg.illegalItem.checkDroppedItem && entity.hasComponent('item'))) return

        const i = entity.getComponent('item').itemStack
        const closestPlrName = execCmd('testfor @p', entity, true).victim?.[0],
            [closestPlr] = closestPlrName ? world.getPlayers( Object.assign( new EntityQueryOptions, { name: closestPlrName } ) ) : []
        
        const dropInfo = `has been dropped at ${Area.toLocationArray(entity.location).map(v => `§a${Math.floor(v)}§r`).join(', ')} (§a${entity.dimension.id}§r)!`,
            closestPlrInfo = `Closest player: §b${closestPlr?.name ?? '§7(unknown)'}§r`

        if ( ccfg.illegalItem.checkItemBan && i.id in ibcfg && ( i.data in ibcfg[i.id].data || -1 in ibcfg[i.id].data ) ) {
            sendMsgToPlayers(getAdmins(), [
                `§6[§eHEXA§6]§r A §cbanned item§r ${dropInfo} §8(Item: §2${i.id}§8, data: §2${i.data}§8)`,
                closestPlrInfo
            ])
            entity.kill()
            return
        }

        if ( ccfg.illegalItem.checkStack && ( i.amount < 0 || i.amount > ( mscfg[i.id] ?? ccfg.illegalItem.defaultStackSize ) ) ) {
            sendMsgToPlayers(getAdmins(), [
                `§6[§eHEXA§6]§r An §cillegal stack size§r ${dropInfo} §8(Item: §2${i.id}§8, stack: §2${i.amount}§8, maximum: §2${mscfg[i.id] ?? ccfg.illegalItem.defaultStackSize}§8)`,
                closestPlrInfo
            ])
            entity.kill()
            return
        }

        if ( ccfg.illegalItem.checkEnch ) {
            try {
                const e = i.getComponent('enchantments').enchantments
                const slotMaxLevel = mecfg.slotCompatibleEnchantments[e.slot]
                for (const enchId of enchList) {
                    const curLevel: number = e.hasEnchantment(MinecraftEnchantmentTypes[enchId]),
                        maxLevel = slotMaxLevel[enchId] ?? 0
                    if ( curLevel < 0 || curLevel > maxLevel) {
                        sendMsgToPlayers(getAdmins(), [
                            `§6[§eHEXA§6]§r An §cillegal enchantment§r ${dropInfo} §8(Item: §2${i.id}§8, enchantment: §2${enchId}§8, level: §2${curLevel}§8, maximum: §2${maxLevel}§8)`,
                            closestPlrInfo
                        ])
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
        const {x, y, z} = block
        if ( ccfg.illegalItem.checkContainerOnPlace && block.getComponent('inventory') && block.id != 'minecraft:shulker_box' && block.id != 'minecraft:undyed_shulker_box' ) {
            const c = block.getComponent('inventory').container
            for (let i = block.id == 'minecraft:chest' || block.id == 'minecraft:trapped_chest' ? c.size - 27 : 0, m = c.size; i < m; i++)
                if (c.getItem(i)) {
                    execCmd(`tag @e[x=${x},y=${y},z=${z},dx=0,dy=0,dz=0,type=item] add _temp`, dimension, true)
                    execCmd(`setblock ${x} ${y} ${z} air 0 destroy`, dimension, true)
                    execCmd(`kill @e[x=${x},y=${y},z=${z},dx=0,dy=0,dz=0,type=item,tag=!_temp]`, dimension, true)
                    execCmd(`tag @e[x=${x},y=${y},z=${z},dx=0,dy=0,dz=0,type=item,tag=_temp] remove _temp`, dimension, true)

                    const info = `placed a §cnon-empty container§r §8(at ${Area.toLocationArray(block.location).map(v => `§2${Math.floor(v)}§8`).join(', ')} (§2${plr.dimension.id}§r))`

                    switch (ccfg.illegalItem.nonEmptyContainerOnPlaceActionType) {
                        // case 'clear': {}; break

                        case 'warn': {
                            sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r §b${plr.name}§r placed a §cnon-empty container§r at ${Area.toLocationArray(block.location).map(v => `§a${Math.floor(v)}§r`).join(', ')} (§a${plr.dimension.id}§r)!`)
                        }; break

                        case 'kick': {
                            kick(plr, info)
                            return 2
                        }; break

                        case 'ban': {
                            bancfg[plr.uid] = Date.now() + ccfg.illegalItem.banDuration * 1000
                            kick(plr, {
                                type: 'ban',
                                banDuration: ccfg.illegalItem.banDuration,
                                reason: info
                            })
                            return 2
                        }; break

                        case 'blacklist': {
                            blcfg[plr.uid] = plr.uid
                            kick(plr, {
                                type: 'blacklist',
                                reason: info
                            })
                            return 2
                        }; break
                    }
                    break
                }
        } else if ( ccfg.illegalItem.renewOnPlace && block.id in rcfg ) {
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
