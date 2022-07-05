import { config_common } from "../configs/common.js";
import { config_id } from "../configs/id.js";
import { libs_misc } from "../libs/misc.js";
import { libs_module } from "../libs/module.js";
import pli from "../pli.js";

const aa = pli.internalModules['checks/namespoof'] = async (b) => {
    const { permission, plr, server, sendChat: { sendMsgToPlayers } } = await b.import('se')
    const ccfg = await b.importInternal('configs/common') as Awaited<config_common>
    const icfg = await b.importInternal('configs/id') as Awaited<config_id>
    const { kick, getAdmins } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = new Module('Namespoof', 'namespoof', true)

    ccfg['ns:checkUID'] ??= 1
    ccfg['ns:checkNameLength'] ??= 1
    ccfg['ns:maxNameLength'] ??= 80

    const aa = server.ev.playerJoin.subscribe((plr, ctrl) => {
        if ( ccfg['ns:checkUID'] && plr.name in icfg && icfg[plr.name] !== plr.uid && permission.getLevel(plr.getTags()) <= 60 ) {
            sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r Kicked §b${plr.name}§r from server: §cNamespoof§r §7(UID mismatch)§r §8(Player UID: §2${plr.uid}§8, listed UID: §2${icfg[plr.name]}§8)`)
            kick(plr, [])
            ctrl.break()
            return
        }
    }, 100)
    if (!module.toggle) server.ev.playerJoin.unsubscribe(aa)

    const ab = module.ev.enable.subscribe(() => {
        server.ev.playerJoin.subscribe(aa)
    })

    const ac = module.ev.disable.subscribe(() => {
        server.ev.playerJoin.unsubscribe(aa)
    })

    const ad = b.ev.unload.subscribe(() => {
        ac()
        module.ev.enable.unsubscribe(ab)
        module.ev.disable.unsubscribe(ac)
        b.ev.unload.subscribe(ad)
    })
}
