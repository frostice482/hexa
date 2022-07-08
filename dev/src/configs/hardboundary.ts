import { libs_config } from "../libs/config.js";
import pli from "../pli.js";

const aa = pli.internalModules['configs/hardboundary'] = async (b) => {
    const { scoreboard, storage, Area } = await b.import('se')
    const config = await b.importInternal('libs/config') as libs_config

    const maxHorizontalBoundary = 0x1ffffff,
        maxVerticalBoundary = 0x1ffffff

    const saveId = `HX:HB:${storage.instance.default.uniqueID.slice(0, 10)}`
    const hardBoundary = !scoreboard.objective.exist(saveId)
        ? Object.assign(config(scoreboard.objective.create(saveId).dummies), {
            x1: ~maxHorizontalBoundary,
            y1: -105,
            z1: ~maxHorizontalBoundary,
            x2: maxHorizontalBoundary,
            y2: maxVerticalBoundary,
            z2: maxHorizontalBoundary,
        })
        : config(scoreboard.objective.edit(saveId).dummies)
    
    return new (class HardBoundary extends Area {
        readonly update = () => {
            const [x1, y1, z1] = this.from,
                [x2, y2, z2] = this.to
            hardBoundary.x1 = x1
            hardBoundary.y1 = y1
            hardBoundary.z1 = z1
            hardBoundary.x2 = x2
            hardBoundary.y2 = y2
            hardBoundary.z2 = z2
            return this
        }
    })(
        [hardBoundary.x1, hardBoundary.y1, hardBoundary.z1],
        [hardBoundary.x2, hardBoundary.y2, hardBoundary.z2],
    )
}

export type config_hardboundary = ReturnType<typeof aa>
