import { config_banlist } from "../configs/banlist.js";
import { config_id } from "../configs/id.js";
import pli from "../pli.js";

pli.internalModules['cc/unban'] = async (b) => {
    const { cc } = await b.import('se')
    const bancfg = await b.importInternal('configs/banlist') as Awaited<config_banlist>
    const { uidOfName } = await b.importInternal('configs/id') as Awaited<config_id>

    new cc('hexa:unban', {
        minPermLvl: 80,
        triggers: /^(hexa-?)?unban$/i,
        typedArgs: new cc.typedArgs([
            { sequence: [ cc.parser.playerSelector ] }
        ]),
        onTrigger: ({ log, typedArgs: tArgs }) => {
            const puid = uidOfName[tArgs[0]]
            if (!(puid in bancfg)) return log(`Player §b${tArgs[0]}§r is not banned.`)

            delete bancfg[puid]
            return log(`Player §b${tArgs[0]}§r (§a${puid}§r) is no longer banned.`)
        },
        isDefault: true
    })

    const ad = b.ev.unload.subscribe(() => {
        cc.delete('hexa:unban')
        b.ev.unload.unsubscribe(ad)
    })
}
