import { libs_config } from "../libs/config.js";
import pli from "../pli.js";

const aa = pli.internalModules['configs/whitelist'] = async (b) => {
    const { scoreboard, storage } = await b.import('se')
    const config = await b.importInternal('libs/config') as libs_config

    const sb = scoreboard.objective.for(`HX:BK:${storage.instance.default.uniqueID.slice(0, 10)}`).dummies

    return {
        scoreboard: sb,
        config: config.nocache(sb) as Record<string, number>
    }
}

export type config_whitelist = ReturnType<typeof aa>
