import pli from "../pli.js";

const aa = pli.internalModules['configs/banlist'] = async (b) => {
    const { scoreboard, storage } = await b.import('se')

    const sb = scoreboard.objective.for(`HX:BL:${storage.instance.default.uniqueID.slice(0, 10)}`).dummies

    const cfg = new Proxy(Object.create(null) as Record<number, number>, {
        get: (t, p) => {
            if (typeof p == 'symbol' || !sb.exist(p)) return
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

export type config_banlist = ReturnType<typeof aa>
