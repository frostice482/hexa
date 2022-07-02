import { libs_config } from "../libs/config.js";
import pli from "../pli.js";

const aa = pli.internalModules['configs/itemban'] = async (b) => {
    const { scoreboard, storage } = await b.import('se')
    const config = await b.importInternal('libs/config') as libs_config

    const saveId = `HX:IB:${storage.instance.default.uniqueID.slice(0, 10)}`
    const itemBansStr = !scoreboard.objective.exist(saveId)
        ? Object.assign(config(scoreboard.objective.create(saveId).dummies), {
            '{"id":"minecraft:double_stone_block_slab","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:crimson_double_slab","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:warped_double_slab","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:double_wooden_slab","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:darkoak_wall_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:darkoak_standing_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:acacia_standing_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:acacia_wall_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:jungle_wall_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:jungle_standing_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:birch_wall_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:birch_standing_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:spruce_wall_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.crimson_door","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.warped_door","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:crimson_standing_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:crimson_wall_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:warped_standing_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:warped_wall_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:spruce_standing_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.dark_oak_door","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.spruce_door","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.birch_door","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.jungle_door","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.acacia_door","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:powered_comparator","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:powered_repeater","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:unpowered_comparator","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:unpowered_repeater","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:pumpkin_stem","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:melon_stem","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:unlit_redstone_torch","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.reeds","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:soul_fire","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.beetroot","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.wheat","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:redstone_wire","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:end_portal","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.hopper","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:portal","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.bed","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.wooden_door","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:unknown","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:netherreactor","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:stonecutter","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:glowingobsidian","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.camera","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:camera","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.nether_wart","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:piston_arm_collision","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:fire","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:wall_sign","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.flower_pot","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:end_gateway","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:frosted_ice","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:lit_furnace","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:underwater_torch","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.campfire","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.kelp","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:bubble_column","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.cauldron","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:lit_redstone_lamp","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:info_update","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:info_update2","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:moving_block","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:reserved6","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.frame","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:invisible_bedrock","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.chain","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:water","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:lava","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:item.iron_door","data":{"-1":""},"action":"ban"}': 0,
            '{"id":"minecraft:beehive","data":{"-1":""},"action":"warn"}': 0,
            '{"id":"minecraft:beenest","data":{"-1":""},"action":"warn"}': 0,
            '{"id":"minecraft:movingBlock","data":{"-1":""},"action":"warn"}': 0,
            
        })
        : config(scoreboard.objective.edit(saveId).dummies)

    const itemBans: Record<string, {
        id: string
        action: 'clear' | 'warn' | 'kick' | 'ban'
        data: Record<number, ''>
        update: () => void
    }> = Object.create(null)

    const create = (id: string, data: number[] | Record<number, ''>, action: typeof itemBans[string]['action'], string?: string) => {
        let itemBanStr = string
        const itemBanData: typeof itemBans[string] = itemBans[id] = Object.setPrototypeOf({
            id,
            action,
            data: Object.setPrototypeOf( Array.isArray(data) ? Object.fromEntries( data.map(v => [v, '']) ) : data, null ),
            update: () => {
                delete itemBansStr[itemBanStr]
                itemBansStr[itemBanStr = JSON.stringify(itemBanData)] = 0
            }
        }, null)
        itemBanData.update()
        return itemBanData
    }

    for (let itemBanStr in itemBansStr) {
        let {id, data, action} = JSON.parse(itemBanStr)
        create(id, data, action, itemBanStr)
    }
    
    return {
        itemBans,
        create
    }
}

export type config_itemban = ReturnType<typeof aa>
