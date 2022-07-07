import './ban.js'
import './blacklist.js'
import './namespoof.js'
import './whitelist.js'

import pli from '../pli.js'
import { libs_module } from '../libs/module.js'

const aa = pli.internalModules['checks/list'] = () => ({}) as Record<string, libs_module>

pli.internalModules['checks/index'] = async (b) => {
    await b.importInternal('checks/ban')
    await b.importInternal('checks/blacklist')
    await b.importInternal('checks/namespoof')
    await b.importInternal('checks/whitelist')

    return b.importInternal('checks/list')
}

export type checks = ReturnType<typeof aa>
