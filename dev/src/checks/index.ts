import './ban.js'
import './blacklist.js'
import './combat.js'
import './item.js'
import './namespoof.js'
import './whitelist.js'

import pli from '../pli.js'

pli.internalModules['checks/index'] = async (b) => {
    await b.importInternal('checks/ban')
    await b.importInternal('checks/blacklist')
    await b.importInternal('checks/combat')
    await b.importInternal('checks/item')
    await b.importInternal('checks/namespoof')
    await b.importInternal('checks/whitelist')
}
