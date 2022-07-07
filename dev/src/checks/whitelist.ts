import { config_whitelist } from "../configs/whitelist.js";
import { libs_misc } from "../libs/misc.js";
import { libs_module } from "../libs/module.js";
import pli from "../pli.js";

pli.internalModules['checks/whitelist'] = async (b) => {
    const { server, permission } = await b.import('se')
    const whitecfg = await b.importInternal('configs/whitelist') as Awaited<config_whitelist>
    const { kick } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = new Module('whitelist', 'Whitelist', false)

    // test event listeners
    const aa = server.ev.playerJoin.subscribe((plr, ctrl) => {
        if ( permission.getLevel(plr.getTags()) >= 60 || whitecfg[plr.name] == plr.uid ) return

        kick(plr, {
            useTemplate: false,
            reason: `Server is currently whitelisted. You are not in the whitelist.`,
            announceLevel: 'none'
        })
        ctrl.break()
    }, 1001)
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
        b.ev.unload.unsubscribe(af)
    })
}
