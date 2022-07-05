import { libs_config } from "../libs/config.js";
import pli from "../pli.js";

const aa = pli.internalModules['configs/id'] = async (b) => {
    const { scoreboard, storage, plr, server } = await b.import('se')
    const { world } = await b.import('mc')
    const config = await b.importInternal('libs/config') as libs_config

    const cfg = config.nocache(scoreboard.objective.for(`HX:ID:${storage.instance.default.uniqueID.slice(0, 10)}`).dummies)

    plr.ev.playerRegister.subscribe(({name, uid}) => {
        cfg[name] = uid
    })
    server.ev.playerJoin.subscribe(({name, uid}) => {
        if (uid !== -1 && !( name in cfg )) cfg[name] = uid
    })
    for (const {name, uid} of world.getPlayers()) cfg[name] = uid

    return cfg
}

export type config_id = ReturnType<typeof aa>
