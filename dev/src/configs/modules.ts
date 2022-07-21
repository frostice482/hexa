import { libs_config } from "../libs/config.js";
import pli from "../pli.js";

const aa = pli.internalModules['configs/modules'] = async (b) => {
    const { scoreboard, storage } = await b.import('se')
    const config = await b.importInternal('libs/config') as libs_config

    return config.cache(scoreboard.objective.for(`HX:MD:${storage.instance.default.uniqueID.slice(0, 10)}`).dummies)
}

export type config_modules = ReturnType<typeof aa>
