import { config_blacklist } from "../configs/blacklist.js";
import { config_common } from "../configs/common.js";
import { libs_misc } from "../libs/misc.js";
import { libs_module } from "../libs/module.js";
import pli from "../pli.js";

pli.internalModules['checks/blacklist'] = async (b) => {
    const { server, permission, sendChat: { sendMsgToPlayers } } = await b.import('se')
    const blackcfg = await b.importInternal('configs/blacklist') as Awaited<config_blacklist>
    const mlist = await b.importInternal('checks/list') as Awaited<config_common>
    const { kick, getAdmins } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = mlist['blacklist'] = new Module('blacklist', 'Blacklist', true)

    // test event listeners
    const aa = server.ev.playerJoin.subscribe((plr, ctrl) => {
        if ( permission.getLevel(plr.getTags()) >= 60 ) {
            if (plr.uid in blackcfg) {
                sendMsgToPlayers(getAdmins([plr]), `§6[§eHEXA§6]§r Removed §b${plr.name}§r from blacklist: this player is an admin`)
                delete blackcfg[plr.uid]
            }
            return
        }
        if (!( plr.uid in blackcfg )) return

        kick(plr, {
            useTemplate: false,
            reason: `You are currently §4blacklisted§r from playing in this server.`,
            announceLevel: 'none'
        })
        ctrl.break()
    }, 1003)
    if (!module.toggle) server.ev.playerJoin.unsubscribe(aa)

    // switch event listeners
    const ad = module.ev.enable.subscribe(() => {
        server.ev.playerJoin.subscribe(aa)
    })

    const ae = module.ev.disable.subscribe(() => {
        server.ev.playerJoin.unsubscribe(aa)
    })

    const af = b.ev.unload.subscribe(() => {
        ae()
        module.ev.enable.unsubscribe(ad)
        module.ev.disable.unsubscribe(ae)
        b.ev.unload.subscribe(af)
    })
}
