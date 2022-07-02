import type scoreboard from "../../types/se/scoreboard.js";
import pli from "../pli.js";

export type objective = typeof scoreboard.objective.prototype

const aa = pli.internalModules['libs/config'] = () => {
    return (dummies: objective['dummies']) => {
        const cache: Record<string, number> = Object.create(null)
        for (const [name, score] of dummies.getScores()) cache[JSON.parse(`"${name}"`)] = score
        return new Proxy(cache, {
            set: (t, p, v) => {
                if (typeof p == 'symbol') return true
                dummies.set(p, t[p] = ~~+v)
                return true
            },
            deleteProperty: (t, p) => {
                if (typeof p == 'symbol') return true
                delete t[p]
                dummies.delete(p)
                return true
            }
        })
    }
}

export type libs_config = ReturnType<typeof aa>
