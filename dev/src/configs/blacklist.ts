import { libs_config } from "../libs/config.js";
import pli from "../pli.js";

const aa = pli.internalModules['configs/blacklist'] = async (b) => {
    const { scoreboard, storage } = await b.import('se')
    const config = await b.importInternal('libs/config') as libs_config

    return config.nocache(scoreboard.objective.for(`HX:BK:${storage.instance.default.uniqueID.slice(0, 10)}`).dummies) as Record<number, number>
}

export type config_blacklist = ReturnType<typeof aa>
