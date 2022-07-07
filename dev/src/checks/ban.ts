import { config_banlist } from "../configs/banlist.js";
import { libs_misc } from "../libs/misc.js";
import pli from "../pli.js";

pli.internalModules['checks/ban'] = async (b) => {
    const { server, permission, misc: { convertToReadableTime } } = await b.import('se')
    const bancfg = await b.importInternal('configs/banlist') as Awaited<config_banlist>
    const { kick } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const aa = server.ev.playerJoin.subscribe((plr, ctrl) => {
        if ( permission.getLevel(plr.getTags()) >= 60 || !( plr.uid in bancfg ) ) return

        kick(plr, {
            useTemplate: false,
            reason: `You are currently §cbanned§r from playing in this server for §a${ convertToReadableTime(bancfg[plr.uid], false) }`,
            announceLevel: 'none'
        })
        ctrl.break()
    }, 1002)

    const af = b.ev.unload.subscribe(() => {
        server.ev.playerJoin.unsubscribe(aa)
        b.ev.unload.unsubscribe(af)
    })
}
