import { config_banlist } from "../configs/banlist.js";
import { config_id } from "../configs/id.js";
import { libs_config } from "../libs/config.js";
import pli from "../pli.js";

pli.internalModules['cc/banlist'] = async (b) => {
    const { cc, misc: { convertToReadableTime } } = await b.import('se')
    const bancfg = await b.importInternal('configs/banlist') as Awaited<config_banlist>
    const config = await b.importInternal('libs/config') as libs_config
    const { nameOfUid } = await b.importInternal('configs/id') as Awaited<config_id>

    new cc('hexa:banlist', {
        minPermLvl: 80,
        triggers: /^(hexa-?)?ban-?list$/i,
        onTrigger: ({ log }) => {
            const arr: string[] = []
            for (const [name, score] of bancfg[config.scoreboard].getScores())
                if (name in bancfg)
                    arr.push(` §8:§r ${nameOfUid[name]}§r (§a${name}§r): expires in §a${ convertToReadableTime(score * 1000 - Date.now(), true) }§r (on §a${ new Date(score * 1000).toString() }§r)`)

            log([
                ` `,
                `Banned players:`,
                ...arr,
                ` `,
            ])
        },
        isDefault: true
    })

    const ad = b.ev.unload.subscribe(() => {
        cc.delete('hexa:banlist')
        b.ev.unload.unsubscribe(ad)
    })
}
