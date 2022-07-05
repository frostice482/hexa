import { config_common } from "../configs/common.js";
import { config_id } from "../configs/id.js";
import { libs_misc } from "../libs/misc.js";
import { libs_module } from "../libs/module.js";
import pli from "../pli.js";

pli.internalModules['checks/namespoof'] = async (b) => {
    const { permission, plr, server, sendChat: { sendMsgToPlayers } } = await b.import('se')
    const mlist = await b.importInternal('checks/list') as Awaited<config_common>
    const ccfg = await b.importInternal('configs/common') as Awaited<config_common>
    const icfg = await b.importInternal('configs/id') as Awaited<config_id>
    const { kick, getAdmins } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const Module = mlist['namespoof'] = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = new Module('namespoof', 'Namespoof', true)

    ccfg['ns:checkUID'] ??= true
    ccfg['ns:checkNameLength'] ??= true
    ccfg['ns:maxNameLength'] ??= 16

    const aa = server.ev.playerJoin.subscribe((plr, ctrl) => {
        if (permission.getLevel(plr.getTags()) <= 60) return

        // check player name length
        if ( ccfg['ns:checkNameLength'] && plr.name.length > ccfg['ns:maxNameLength'] ) {
            sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r Kicked §b${plr.name.substring(0, ccfg['ns:maxNameLength'])}§r from server: §cNamespoof§r §7(Name length exceeded)§r §8(length: §2${plr.name.length}§8, max length: §2${ccfg['ns:maxNameLength']}§8)`)
            kick(plr, [])
            ctrl.break()
            return
        }

        // check player uid
        if ( ccfg['ns:checkUID'] && plr.name in icfg && icfg[plr.name] !== plr.uid ) {
            sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r Kicked §b${plr.name}§r from server: §cNamespoof§r §7(UID mismatch)§r §8(player UID: §2${plr.uid}§8, expected UID: §2${icfg[plr.name]}§8)`)
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


