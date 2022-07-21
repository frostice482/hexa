import type scoreboard from "../../types/se/scoreboard.js";
import pli from "../pli.js";

export type objective = typeof scoreboard.objective.prototype

const aa = pli.internalModules['libs/config'] = () => {
    class config {
        static cache = (dummies: objective['dummies']) => {
            const cache: configObj = Object.create(null)
            cache[config.scoreboard] = dummies

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
        }

        static nocache = (dummies: objective['dummies']) => {
            const obj: configObj = Object.create(null)
            obj[config.scoreboard] = dummies

            return new Proxy(obj, {
                //@ts-expect-error
                get: (t, p) => typeof p == 'symbol' ? obj[p] : dummies.get('§r' + p),
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

        static readonly scoreboard = Symbol()
    }
    return config
}

export type libs_config = ReturnType<typeof aa>

declare const config: libs_config
export type configObj<K extends string | number = string> = Record<K, number> & { [config.scoreboard]: objective['dummies'] }
