import pli from "../pli.js";

const aa = pli.internalModules['configs/common'] = async (b) => {
    const { storage } = await b.import('se')

    const saveData = new storage.instance<{save: any}>(`HX:CM:${storage.instance.default.uniqueID.slice(0, 10)}`)
    saveData.autosaveInterval = 0
    const p = new Promise<any>((res, rej) => {
        if (!saveData.saveInfo.value) return res(Object.create(null))
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
    const obj = await p
    saveData.ev.save.subscribe((data) => data.save = obj)

    return obj
}

export type config_common = ReturnType<typeof aa>
