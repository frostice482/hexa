import { libs_config } from "../libs/config.js";
import pli from "../pli.js";

const aa = pli.internalModules['configs/common'] = async (b) => {
    const { scoreboard, storage } = await b.import('se')
    const config = await b.importInternal('libs/config') as libs_config

    return config(scoreboard.objective.for(`HX:CM:${storage.instance.default.uniqueID.slice(0, 10)}`).dummies)
}

export type config_common = ReturnType<typeof aa>
