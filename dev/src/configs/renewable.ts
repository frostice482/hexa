import { libs_config } from "../libs/config.js";
import pli from "../pli.js";

const aa = pli.internalModules['configs/renewable'] = async (b) => {
    const { scoreboard, storage } = await b.import('se')
    const config = await b.importInternal('libs/config') as libs_config

    const saveId = `HX:RN:${storage.instance.default.uniqueID.slice(0, 10)}`
    const maxStacks = !scoreboard.objective.exist(saveId)
        ? Object.assign(config(scoreboard.objective.create(saveId).dummies), {
            'minecraft:composter': 0,
            'minecraft:campfire': 0,
            'minecraft:soul_campfire': 0,
            'minecraft:furnace': 0,
            'minecraft:blast_furnace': 0,
            'minecraft:smoker': 0,
            'minecraft:brewing_stand': 0,
            'minecraft:barrel': 0,
            'minecraft:hopper': 0,
            'minecraft:dropper': 0,
            'minecraft:dispenser': 0
        })
        : config(scoreboard.objective.edit(saveId).dummies)
    
    return maxStacks
}

export type config_renewable = ReturnType<typeof aa>
