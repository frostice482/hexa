import type scoreboard from "../../types/se/scoreboard.js";
import pli from "../pli.js";

export type objective = typeof scoreboard.objective.prototype

const aa = pli.internalModules['libs/config'] = () => {
    return Object.assign(
        (dummies: objective['dummies']) => {
            const cache: Record<string, number> = Object.create(null)
            for (const [name, score] of dummies.getScores()) cache[name.substring(2)] = score
            return new Proxy(cache, {
                set: (t, p, v) => {
                    if (typeof p == 'symbol') return true
                    dummies.set('§r' + p, t[p] = ~~+v)
                    return true
                },
                deleteProperty: (t, p) => {
                    if (typeof p == 'symbol') return true
                    delete t[p]
                    dummies.delete('§r' + p)
                    return true
                }
            })
        }, {
            nocache: (dummies: objective['dummies']) => {
                return new Proxy(Object.create(null) as Record<string, number>, {
                    get: (t, p) => typeof p == 'symbol' ? undefined : dummies.get('§r' + p),
                    set: (t, p, v) => {
                        if (typeof p == 'symbol') return true
                        dummies.set('§r' + p, ~~+v)
                        return true
                    },
                    has: (t, p) => typeof p == 'symbol' ? false : dummies.exist('§r' + p),
                    deleteProperty: (t, p) => {
                        if (typeof p == 'symbol') return true
                        dummies.delete('§r' + p)
                        return true
                    }
                })
            }
        }
    )
}

export type libs_config = ReturnType<typeof aa>
