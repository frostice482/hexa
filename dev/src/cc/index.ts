import './ban.js'
import './blacklist.js'
import './kick.js'
import './warn.js'

import pli from '../pli.js'

pli.internalModules['cc/index'] = async (b) => {
    await b.importInternal('cc/ban')
    await b.importInternal('cc/blacklist')
    await b.importInternal('cc/kick')
    await b.importInternal('cc/warn')
}
