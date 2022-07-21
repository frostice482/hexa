import { configObj, libs_config } from "../libs/config.js";
import pli from "../pli.js";

const aa = pli.internalModules['configs/whitelist'] = async (b) => {
    const { scoreboard, storage } = await b.import('se')
    const config = await b.importInternal('libs/config') as libs_config

    const sb = scoreboard.objective.for(`HX:WL:${storage.instance.default.uniqueID.slice(0, 10)}`).dummies

    return config.nocache(sb) as configObj
}

export type config_whitelist = ReturnType<typeof aa>
