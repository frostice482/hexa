import { Player } from "mojang-minecraft";
import type { eventControl } from "../../types/se/evmngr.js";
import { config_banlist } from "../configs/banlist.js";
import { config_blacklist } from "../configs/blacklist.js";
import { config_common } from "../configs/common.js";
import { config_id } from "../configs/id.js";
import { libs_misc } from "../libs/misc.js";
import { libs_module } from "../libs/module.js";
import pli from "../pli.js";

pli.internalModules['checks/namespoof'] = async (b) => {
    const { permission, plr, server, misc: { parseRegex } } = await b.import('se')
    const bancfg = await b.importInternal('configs/banlist') as Awaited<config_banlist>
    const blackcfg = await b.importInternal('configs/blacklist') as Awaited<config_blacklist>
    const ccfg = await b.importInternal('configs/common') as Awaited<config_common>
    const { uidOfName: icfg, nameOfUid: icfg2 } = await b.importInternal('configs/id') as Awaited<config_id>
    const { kick } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    const Module = await b.importInternal('libs/module') as Awaited<libs_module>
    const module = new Module('namespoof', 'Namespoof', true)

    const cfg = ccfg.namespoof = {
        checkUID: true,
        uidMismatchActionType: 'kick',

        checkRename: true,
        renameActionType: 'blacklist',

        checkNameLength: true,
        maxNameLength: 16,
        lengthActionType: 'blacklist',

        checkIllegalName: true,
        illegalNameRegex: '/["\\\\]/',
        illegalNameActionType: 'blacklist'
    }

    let illegalNameRegex = parseRegex( cfg.illegalNameRegex )
    Object.defineProperty(cfg, 'illegalNameRegex', {
        get: () => String(illegalNameRegex),
        set: (v) => illegalNameRegex = parseRegex(v ??= '')
    })

    const begone = (plr: Player, ctrl: eventControl, reason: string, type: 'kick' | 'ban' | 'blacklist') => {
        kick(plr, {
            type,
            banDuration: ccfg.ban.defaultDuration,
            reason: reason,
        })
        ctrl.break()
    }

    const tests: Record<string, (plr: Player, ctrl: eventControl) => boolean> = {
        rename: (plr, ctrl) => {
            if ( cfg.checkRename && plr.uid !== -1 && icfg2[plr.uid] !== plr.name ) {
                begone(plr, ctrl, `§cNamespoof§r §7(Renamed)§r §8(player UID: §2${plr.uid}§8, known as: §2${icfg2[plr.uid]}§8)`, cfg.renameActionType)
                return true
            }
            return false
        },
        illegalName: (plr, ctrl) => {
            if ( cfg.checkIllegalName && illegalNameRegex.test(plr.name) ) {
                begone(plr, ctrl, `§cNamespoof§r §7(Illegal name)§r`, cfg.illegalNameActionType)
                return true
            }
            return false
        },
        nameLength: (plr, ctrl) => {
            if ( cfg.checkNameLength && plr.name.length > cfg.maxNameLength ) {
                begone(plr, ctrl, `§cNamespoof§r §7(Name length exceeded)§r §8(length: §2${plr.name.length}§8, max length: §2${cfg.maxNameLength}§8)`, cfg.lengthActionType)
                return true
            }
            return false
        },
        uid: (plr, ctrl) => {
            if ( cfg.checkUID && plr.uid !== -1 && plr.name in icfg && icfg[plr.name] !== plr.uid ) {
                begone(plr, ctrl, `§cNamespoof§r §7(UID mismatch)§r §8(player UID: §2${plr.uid}§8, expected UID: §2${icfg[plr.name]}§8)`, cfg.uidMismatchActionType)
                return true
            }
            return false
        }
    }

    // test event listeners
    const aa = server.ev.playerJoin.subscribe((plr, ctrl) => {
        if (permission.getLevel(plr.getTags()) >= 60) return
        
        tests.rename(plr, ctrl)
        || tests.nameLength(plr, ctrl)
        || tests.illegalName(plr, ctrl)
        || tests.uid(plr, ctrl)
    }, 1000)
    if (!module.toggle) server.ev.playerJoin.unsubscribe(aa)

    const ab = plr.ev.playerRegister.subscribe((plr, ctrl) => {
        if (permission.getLevel(plr.getTags()) >= 60) return

        tests.uid(plr, ctrl)
    }, 1000)
    if (!module.toggle) plr.ev.playerRegister.unsubscribe(ab)

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
        module.ev.enable.unsubscribe(ad)
        module.ev.disable.unsubscribe(ae)
        b.ev.unload.unsubscribe(af)
    })
}


