import type { Player } from "mojang-minecraft";
import type eventManager from "../../types/se/evmngr.js";
import { config_modules } from "../configs/modules.js";
import pli from "../pli.js";
import { libs_misc } from "./misc.js";

const aa = pli.internalModules['libs/module'] = async (b) => {
    const { sendChat: { sendMsgToPlayers, sendMsgToPlayer }, eventManager } = await b.import('se')
    const mcfg = await b.importInternal('configs/modules') as Awaited<config_modules>
    const { getAdmins } = await b.importInternal('libs/misc') as Awaited<libs_misc>

    class module {
        static get ev() { return events }
        static get events() { return events }

        static readonly 'get' = (id: string) => moduleList.get(id)
        static readonly exist = (id: string) => moduleList.has(id)
        static readonly getList = () => moduleList.values()

        constructor(id: string, name = id, defaultToggle = true) {
            this.id = id
            this.name = name

            const { events, triggerEvent: lte } = new eventManager<moduleInstanceEventList>(['disable', 'enable'])
            this.ev = this.events = events
            this.#triggerEvent = lte

            this.#cachedToggle = Boolean( mcfg[id] ??= +defaultToggle )
            Object.defineProperty(mcfg, id, {
                get: () => +this.#cachedToggle,
                set: (v) => ( v ? this.enable : this.disable )()
            })

            moduleList.set(id, this)
            triggerEvent.register(this)
        }

        readonly id: string
        readonly name: string

        readonly ev: moduleInstanceEventInstance['events']
        readonly events: moduleInstanceEventInstance['events']
        #triggerEvent: moduleInstanceEventInstance['triggerEvent']

        #cachedToggle: boolean
        get toggle() { return this.#cachedToggle }
        set toggle(v) { ( v ? this.enable : this.disable )() }

        readonly enable = (enabler: Player | string = '[System]') => {
            if (this.#cachedToggle == true) return
            this.#cachedToggle = true
            this.#triggerEvent.enable({ enabler })
        }

        readonly disable = (disabler: Player | string = '[System]') => {
            if (this.#cachedToggle == false) return
            this.#cachedToggle = false
            this.#triggerEvent.disable({ disabler })
        }
    }

    const moduleList = new Map<string, module>()

    // event stuff
    const { events, triggerEvent } = new eventManager<{ register: module }>(['register'])

    type moduleInstanceEventList = {
        enable: { enabler: Player | string }
        disable: { disabler: Player | string }
    }
    type moduleInstanceEventInstance = eventManager<moduleInstanceEventList>

    // inform stuff
    events.register.subscribe((module) => {
        module.ev.enable.subscribe(({enabler}) => {
            const isPlr = typeof enabler !== 'string'
            sendMsgToPlayers(getAdmins(isPlr ? [enabler] : []), `§6[§eHEXA§6]§r Module §a${module.name}§r has been §aenabled§r by §b${isPlr ? enabler.nickname : enabler}§r.`)
            if (isPlr) sendMsgToPlayer(enabler, `Module §a${module.name}§r has been §aenabled§r.`)
        })
        module.ev.disable.subscribe(({disabler}) => {
            const isPlr = typeof disabler !== 'string'
            sendMsgToPlayers(getAdmins(isPlr ? [disabler] : []), `§6[§eHEXA§6]§r Module §a${module.name}§r has been §cdisabled§r by §b${isPlr ? disabler.nickname : disabler}§r.`)
            if (isPlr) sendMsgToPlayer(disabler, `Module §a${module.name}§r has been §aenabled§r.`)
        })
    })

    return module
}

export type libs_module = ReturnType<typeof aa>
