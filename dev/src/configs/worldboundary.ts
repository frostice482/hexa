import { libs_config } from "../libs/config.js";
import pli from "../pli.js";

const aa = pli.internalModules['configs/worldboundary'] = async (b) => {
    const { scoreboard, storage, Area } = await b.import('se')
    const config = await b.importInternal('libs/config') as libs_config

    const saveId = `HX:WB:${storage.instance.default.uniqueID.slice(0, 10)}`
    const worldBoundary = !scoreboard.objective.exist(saveId)
        ? Object.assign(config(scoreboard.objective.create(saveId).dummies), {
            x1: -1048576,
            y1: -104,
            z1: -1048576,
            x2: 1048576,
            y2: 8192,
            z2: 1048576,
        })
        : config(scoreboard.objective.edit(saveId).dummies)
    
    return new (class WorldBoundary extends Area {
        readonly update = () => {
            const [x1, y1, z1] = this.from,
                [x2, y2, z2] = this.to
            worldBoundary.x1 = x1
            worldBoundary.y1 = y1
            worldBoundary.z1 = z1
            worldBoundary.x2 = x2
            worldBoundary.y2 = y2
            worldBoundary.z2 = z2
            return this
        }
    })(
        [worldBoundary.x1, worldBoundary.y1, worldBoundary.z1],
        [worldBoundary.x2, worldBoundary.y2, worldBoundary.z2],
    )
}

export type config_worldboundary = ReturnType<typeof aa>
