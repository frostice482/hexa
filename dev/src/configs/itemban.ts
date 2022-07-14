import pli from "../pli.js";

export type itemBanData = {
    data: Record<number, ''>
    action: 'clear'| 'alert' | 'warn' | 'kick' | 'ban' | 'blacklist'
}

export type itemBanList = Record<string, itemBanData>

const aa = pli.internalModules['configs/itemban'] = async (b) => {
    const { storage } = await b.import('se')

    const saveData = new storage.instance<{ save: itemBanList }>(`HX:IB:${storage.instance.default.uniqueID.slice(0, 10)}`)
    saveData.autosaveInterval = 0
    const obj = await new Promise<itemBanList>((res, rej) => {
        if (!saveData.saveInfo.value) {
            saveData.autosaveInterval = 30000
            return res(
                Object.setPrototypeOf({
                    "minecraft:double_stone_block_slab": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:crimson_double_slab": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:warped_double_slab": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:double_wooden_slab": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:darkoak_wall_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:darkoak_standing_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:acacia_standing_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:acacia_wall_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:jungle_wall_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:jungle_standing_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:birch_wall_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:birch_standing_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:spruce_wall_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.crimson_door": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.warped_door": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:crimson_standing_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:crimson_wall_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:warped_standing_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:warped_wall_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:spruce_standing_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.dark_oak_door": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.spruce_door": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.birch_door": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.jungle_door": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.acacia_door": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:powered_comparator": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:powered_repeater": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:unpowered_comparator": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:unpowered_repeater": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:pumpkin_stem": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:melon_stem": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:unlit_redstone_torch": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.reeds": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:soul_fire": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.beetroot": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.wheat": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:redstone_wire": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:end_portal": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.hopper": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:portal": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.bed": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.wooden_door": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:unknown": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:netherreactor": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:stonecutter": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:glowingobsidian": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.camera": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:camera": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.nether_wart": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:piston_arm_collision": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:fire": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:wall_sign": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.flower_pot": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:end_gateway": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:frosted_ice": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:lit_furnace": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:underwater_torch": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.campfire": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.kelp": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:bubble_column": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.cauldron": { "data": { "-1": "" }, "action": "blacklist" }, 
                    "minecraft:lit_redstone_lamp": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:info_update": { "data": { "-1": "" }, "action": "blacklist" }, 
                    "minecraft:info_update2": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:moving_block": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:reserved6": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.frame": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:invisible_bedrock": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.chain": { "data": { "-1": "" }, "action": "blacklist" }, 
                    "minecraft:water": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:lava": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:item.iron_door": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:movingBlock": { "data": { "-1": "" }, "action": "blacklist" },
                    "minecraft:beehive": { "data": { "-1": "" }, "action": "warn" },
                    "minecraft:bee_nest": { "data": { "-1": "" }, "action": "warn" },
                    "minecraft:mob_spawner": { "data": { "-1": "" }, "action": "warn" }
                }, null)
            )
        }
        const cb = saveData.ev.load.subscribe((data) => {
            try {
                saveData.ev.load.unsubscribe(cb)
                res( Object.setPrototypeOf(data.save ?? {}, null) )
                saveData.autosaveInterval = 30000
            } catch (e) {
                rej(e)
            }
        })
    })
    saveData.ev.save.subscribe((data) => data.save = obj)

    const aa = b.ev.unload.subscribe(() => {
        saveData.autosaveInterval = 0
        b.ev.unload.unsubscribe(aa)
    })

    return obj
}

export type config_itemban = ReturnType<typeof aa>
