import './namespoof.js'

import pli from '../pli.js'
import { libs_module } from '../libs/module.js'

const aa = pli.internalModules['checks/list'] = () => ({}) as Record<string, libs_module>

pli.internalModules['checks/index'] = async (b) => {
    await b.importInternal('checks/namespoof')

    return b.importInternal('checks/list')
}

export type checks = ReturnType<typeof aa>
