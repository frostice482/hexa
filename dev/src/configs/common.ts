import pli from "../pli.js";

export type commonSaveData = {
    kick: {
        useKickCommand: boolean
    }
    namespoof: {
        actionType: 'kick' | 'ban' | 'blacklist'
        banDuration: number
        checkUID: boolean
        checkNameLength: boolean
        maxNameLength: number
        checkIllegalName: boolean
        checkRename: boolean
        illegalNameRegex: string
    }
    illegalItem: {
        checkInterval: number
        checkDroppedItem: boolean
        checkItemBan: boolean
        checkStack: boolean
        defaultStackSize: number
        stackActionType: 'clear' | 'warn' | 'kick' | 'ban' | 'blacklist'
        checkEnch: boolean
        checkContainerOnPlace: boolean
        nonEmptyContainerOnPlaceActionType: 'clear' | 'warn' | 'kick' | 'ban' | 'blacklist'
        renewOnPlace: boolean
        enchActionType: 'clear' | 'warn' | 'kick' | 'ban' | 'blacklist'
        banDuration: number
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
