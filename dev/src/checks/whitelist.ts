import { config_whitelist } from "../configs/whitelist.js";
import { libs_misc } from "../libs/misc.js";
import { libs_module } from "../libs/module.js";
import pli from "../pli.js";

pli.internalModules['checks/whitelist'] = async (b) => {
    const { server, permission, plr: plrC } = await b.import('se')
    const { world } = await b.import('mc')
    const { config: whitecfg } = await b.importInternal('configs/whitelist') as Awaited<config_whitelist>
    const { kick } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = new Module('whitelist', 'Whitelist', false)

    // test event listeners
    const aa = server.ev.playerJoin.subscribe((plr, ctrl) => {
        if ( permission.getLevel(plr.getTags()) >= 60 || whitecfg[plr.name] == plr.uid ) return

        if (whitecfg[plr.name] == -1) {
            if (plr.uid != -1) return whitecfg[plr.name] = plr.uid
            const aa = plrC.ev.playerRegister.subscribe((nplr) => {
                if (nplr != plr) return
                ab()
                whitecfg[plr.name] = plr.uid
            })
            const ab = b.ev.unload.subscribe(() => {
                plrC.ev.playerRegister.unsubscribe(aa)
                b.ev.unload.unsubscribe(ab)
            })
            return
        }

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

        for (const plr of world.getPlayers()) {
            if (permission.getLevel(plr.getTags()) >= 60 || whitecfg[plr.name] == plr.uid) continue
            kick(plr, {
                type: 'kick',
                announceLevel: 'none',
                reason: 'Whitelist module has been enabled'
            })
        }
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
