import { Player } from "mojang-minecraft";
import { libs_config } from "../libs/config.js";
import pli from "../pli.js";

type logData = {
    i: number
    type: string

    moderator: string
    player: string
    message: string

    timestamp: number
    duration?: number

    stringed?: string
}

const aa = pli.internalModules['configs/log'] = async (b) => {
    const { scoreboard, storage } = await b.import('se')
    const config = await b.importInternal('libs/config') as libs_config

    const logCfgId = `HX:LC:${storage.instance.default.uniqueID.slice(0, 10)}`
    const logCfg = !scoreboard.objective.exist(logCfgId)
        ? Object.assign(config(scoreboard.objective.create(logCfgId).dummies), {
            startPoint: 0,
            endPoint: 0,
            maxSize: 100,
            currentIndex: 0
        })
        : config(scoreboard.objective.edit(logCfgId).dummies)
    
    const logDataId = `HX:LD:${storage.instance.default.uniqueID.slice(0, 10)}`
    const logDataSb = scoreboard.objective.for(logDataId).dummies

    const logArr: logData[] = []
    for (const [data, score] of logDataSb.getScores())
        if (score >= logCfg.startPoint && score < logCfg.endPoint) {
            logArr[score] = JSON.parse(data)
            logArr[score].stringed = data
        }
    
    return class Log {
        static get size() { return logArr.length }
        static get maxSize() { return logCfg.maxSize }
        static set maxSize(v) {
            logCfg.maxSize = v
            for (let i = 0 ; i < logArr.length - v; i++, logCfg.startPoint++) {
                const data = logArr.shift()
                if (!data) continue

                logDataSb.delete(data.stringed)
            }
        }

        static readonly add = (type: string, player: Player | string, moderator: Player | string, message: string, duration = 0) => {
            const data: logData = {
                i: logCfg.currentIndex,
                type,

                moderator: typeof moderator == 'string' ? moderator : moderator.name,
                player: typeof player == 'string' ? player : player.name,
                message,

                duration,
                timestamp: Date.now()
            }
            data.stringed = JSON.stringify(data)

            logDataSb.set(data.stringed, logCfg.currentIndex++)

            logCfg.endPoint++
            if (logArr.push(data) > logCfg.maxSize) {
                logArr.shift()
                logCfg.startPoint++
            }
        }

        static readonly iterate = function*() {
            for (let i = logArr.length - 1; i >= 0; i--) yield logArr[i]
        }
    }
}

export type config_log = ReturnType<typeof aa>
