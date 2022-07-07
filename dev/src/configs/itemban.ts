import pli from "../pli.js";

export type itemBanData = {
    data: Record<number, ''>
    action: 'clear' | 'warn' | 'kick' | 'ban' | 'blacklist'
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
                    "minecraft:double_stone_block_slab": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:crimson_double_slab": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:warped_double_slab": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:double_wooden_slab": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:darkoak_wall_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:darkoak_standing_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:acacia_standing_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:acacia_wall_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:jungle_wall_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:jungle_standing_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:birch_wall_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:birch_standing_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:spruce_wall_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.crimson_door": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.warped_door": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:crimson_standing_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:crimson_wall_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:warped_standing_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:warped_wall_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:spruce_standing_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.dark_oak_door": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.spruce_door": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.birch_door": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.jungle_door": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.acacia_door": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:powered_comparator": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:powered_repeater": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:unpowered_comparator": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:unpowered_repeater": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:pumpkin_stem": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:melon_stem": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:unlit_redstone_torch": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.reeds": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:soul_fire": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.beetroot": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.wheat": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:redstone_wire": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:end_portal": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.hopper": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:portal": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.bed": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.wooden_door": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:unknown": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:netherreactor": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:stonecutter": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:glowingobsidian": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.camera": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:camera": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.nether_wart": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:piston_arm_collision": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:fire": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:wall_sign": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.flower_pot": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:end_gateway": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:frosted_ice": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:lit_furnace": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:underwater_torch": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.campfire": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.kelp": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:bubble_column": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.cauldron": { "data": { "-1": "" }, "action": "ban" }, 
                    "minecraft:lit_redstone_lamp": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:info_update": { "data": { "-1": "" }, "action": "ban" }, 
                    "minecraft:info_update2": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:moving_block": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:reserved6": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.frame": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:invisible_bedrock": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.chain": { "data": { "-1": "" }, "action": "ban" }, 
                    "minecraft:water": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:lava": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:item.iron_door": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:movingBlock": { "data": { "-1": "" }, "action": "ban" },
                    "minecraft:beehive": { "data": { "-1": "" }, "action": "warn" },
                    "minecraft:beenest": { "data": { "-1": "" }, "action": "warn" }
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
