import { Player } from "mojang-minecraft";
import type { eventControl } from "../../types/se/evmngr.js";
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

    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = mlist['namespoof'] = new Module('namespoof', 'Namespoof', true)

    ccfg['ns:checkUID'] ??= true
    ccfg['ns:checkNameLength'] ??= true
    ccfg['ns:maxNameLength'] ??= 16

    const tests: Record<string, (plr: Player, ctrl: eventControl) => boolean> = {
        nameLength: (plr, ctrl) => {
            console.warn(
                ccfg['ns:checkNameLength'],
                plr.name.length,
                ccfg['ns:maxNameLength']
            )
            if ( ccfg['ns:checkNameLength'] && plr.name.length > ccfg['ns:maxNameLength'] ) {
                sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r Kicked §b${plr.name.substring(0, ccfg['ns:maxNameLength'])}§r from server: §cNamespoof§r §7(Name length exceeded)§r §8(length: §2${plr.name.length}§8, max length: §2${ccfg['ns:maxNameLength']}§8)`)
                kick(plr, [])
                addCancelList(plr, ctrl)
                return true
            }
            return false
        },
        uid: (plr, ctrl) => {
            console.warn(
                ccfg['ns:checkUID'],
                plr.uid,
                plr.name in icfg,
                icfg[plr.name]
            )
            if ( ccfg['ns:checkUID'] && plr.uid !== -1 && plr.name in icfg && icfg[plr.name] !== plr.uid ) {
                sendMsgToPlayers(getAdmins(), `§6[§eHEXA§6]§r Kicked §b${plr.name}§r from server: §cNamespoof§r §7(UID mismatch)§r §8(player UID: §2${plr.uid}§8, expected UID: §2${icfg[plr.name]}§8)`)
                kick(plr, [])
                addCancelList(plr, ctrl)
                return true
            }
            return false
        }
    }

    const addCancelList = (plr: Player, ctrl: eventControl) => {
        cancelList.add(plr)
        ctrl.break()
    }

    // test event listeners
    const aa = server.ev.playerJoin.subscribe((plr, ctrl) => {
        if (permission.getLevel(plr.getTags()) > 60) return
        
        tests.nameLength(plr, ctrl)
        tests.uid(plr, ctrl)
    }, 1000)
    if (!module.toggle) server.ev.playerJoin.unsubscribe(aa)

    const ab = plr.ev.playerRegister.subscribe((plr, ctrl) => {
        if (permission.getLevel(plr.getTags()) > 60) return

        tests.uid(plr, ctrl)
    }, 1000)
    if (!module.toggle) plr.ev.playerRegister.unsubscribe(ab)

    const ac = server.ev.playerLoad.subscribe((plr, ctrl) => {
        if (cancelList.has(plr)) {
            cancelList.delete(plr)
            ctrl.break()
        }
    }, 1000)

    const cancelList = new WeakSet<Player>()

    // switch event listeners
    const ad = module.ev.enable.subscribe(() => {
        server.ev.playerJoin.subscribe(aa)
        plr.ev.playerRegister.subscribe(ab)
    })

    const ae = module.ev.disable.subscribe(() => {
        server.ev.playerJoin.unsubscribe(aa)
        plr.ev.playerRegister.unsubscribe(ab)
    })

    const af = b.ev.unload.subscribe(() => {
        ae()
        server.ev.playerLoad.subscribe(ac)
        module.ev.enable.unsubscribe(ad)
        module.ev.disable.unsubscribe(ae)
        b.ev.unload.subscribe(af)
    })
}


