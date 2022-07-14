import pli from "../pli.js";

export type commonSaveData = {
    kick: {
        useKickCommand: boolean
    }
    combat: {
        killaura: {
            check: boolean
            tolerance: [horizontal: number, vertical: number]

            actionThresholds: {
                warn: number
                kick: number
                ban: number
            }
        }
        reach: {
            check: boolean

            threshold: number
            actionThresholds: {
                warn: number
                kick: number
                ban: number
            }
        }
        autoclicker: {
            check: boolean

            threshold: number
            actionThresholds: {
                warn: number
                kick: number
                ban: number
            }
        }
        vcCooldownInterval: number
        banDuration: number
    }
    namespoof: {
        checkUID: boolean
        uidMismatchActionType: 'alert' | 'warn' | 'kick' | 'ban' | 'blacklist'

        checkRename: boolean
        renameActionType: 'alert' | 'warn' | 'kick' | 'ban' | 'blacklist'

        checkNameLength: boolean
        maxNameLength: number
        lengthActionType: 'alert' | 'warn' | 'kick' | 'ban' | 'blacklist'

        checkIllegalName: boolean
        illegalNameRegex: string
        illegalNameActionType: 'alert' | 'warn' | 'kick' | 'ban' | 'blacklist'

        banDuration: number
    }
    illegalItem: {
        checkInterval: number
        checkDroppedItem: boolean
        checkItemBan: boolean

        checkStack: boolean
        defaultStackSize: number
        stackActionType: 'clear' | 'alert' | 'warn' | 'kick' | 'ban' | 'blacklist'

        checkEnch: boolean
        enchActionType: 'clear' | 'alert' | 'warn' | 'kick' | 'ban' | 'blacklist'

        checkContainerOnPlace: boolean
        nonEmptyContainerActionType: 'clear' | 'alert' | 'warn' | 'kick' | 'ban' | 'blacklist'
        nestedContainerActionType: 'clear' | 'alert' | 'warn' | 'kick' | 'ban' | 'blacklist'

        renewOnPlace: boolean
        
        banDuration: number
    }
    gamemode: {
        [K in 'survival' | 'creative' | 'adventure' | 'spectator']: {
            enabled: boolean
            exclude?: string
            actionType: 'alert' | 'warn' | 'kick' | 'ban' | 'blacklist'
            setTo: Exclude<'survival' | 'creative' | 'adventure' | 'spectator', K>
        }
    } & {
        checkInterval: number
        banDuration: number
    }
    boundary: {
        checkInterval: number
        padding: number
        hardBoundary: {
            enabled: boolean
            actionType: 'alert' | 'warn' | 'kick' | 'ban' | 'blacklist'
            banDuration: number
        }
    }
}

const aa = pli.internalModules['configs/common'] = async (b) => {
    const { storage } = await b.import('se')

    const saveData = new storage.instance<{save: commonSaveData}>(`HX:CM:${storage.instance.default.uniqueID.slice(0, 10)}`)
    saveData.autosaveInterval = 0
    const obj = await new Promise<commonSaveData>((res, rej) => {
        if (!saveData.saveInfo.value) {
            saveData.autosaveInterval = 30000
            return res(Object.create(null))
        }
        const cb = saveData.ev.load.subscribe((data) => {
            try {
                saveData.ev.load.unsubscribe(cb)
                res( Object.setPrototypeOf(data.save ?? {}, null) )
                saveData.autosaveInterval = 30000
            } catch (e) {
                rej(e)
            }
        })
    })
    saveData.ev.save.subscribe((data) => data.save = obj)

    const aa = b.ev.unload.subscribe(() => {
        saveData.autosaveInterval = 0
        b.ev.unload.unsubscribe(aa)
    })

    return obj
}

export type config_common = ReturnType<typeof aa>
