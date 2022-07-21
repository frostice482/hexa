import { configObj, libs_config } from "../libs/config.js";
import pli from "../pli.js";

const aa = pli.internalModules['configs/mutelist'] = async (b) => {
    const { scoreboard, storage } = await b.import('se')
    const config = await b.importInternal('libs/config') as libs_config

    const sb = scoreboard.objective.for(`HX:ML:${storage.instance.default.uniqueID.slice(0, 10)}`).dummies

    const obj: configObj<number> = Object.create(null)
    obj[config.scoreboard] = sb

    const cfg = new Proxy(obj, {
        get: (t, p) => {
            if (typeof p == 'symbol') return obj[p]
            if (!sb.exist(p)) return
            const expireTime = sb.get(p) * 1000
            return expireTime > Date.now() ? expireTime : void sb.delete(p)
        },
        set: (t, p, v) => {
            if (typeof p == 'symbol') return true
            sb.set(p, ~~(+v / 1000))
            return true
        },
        has: (t, p) => typeof p != 'symbol' && sb.exist(p) && ( sb.get(p) * 1000 > Date.now() ? true : ( sb.delete(p), false ) ),
        deleteProperty: (t, p) => {
            if (typeof p == 'symbol') return true
            sb.delete(p)
            return true
        }
    })

    return cfg
}

export type config_mutelist = ReturnType<typeof aa>
