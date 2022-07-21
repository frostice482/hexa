import './ban.js'
import './banlist.js'
import './unban.js'
import './blacklist.js'
import './whitelist.js'
import './kick.js'
import './warn.js'
import './modlog.js'

import pli from '../pli.js'

pli.internalModules['cc/index'] = async (b) => {
    await b.importInternal('cc/ban')
    await b.importInternal('cc/banlist')
    await b.importInternal('cc/unban')
    await b.importInternal('cc/blacklist')
    await b.importInternal('cc/whitelist')
    await b.importInternal('cc/kick')
    await b.importInternal('cc/warn')
    await b.importInternal('cc/modlog')
}
