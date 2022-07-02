import './common.js'
import './hardboundary.js'
import './itemban.js'
import './maxench.js'
import './maxstack.js'
import './modules.js'
import './worldboundary.js'

import pli from '../pli.js'

pli.internalModules['configs/index'] = async (b) => {
    await b.importInternal('configs/common')
    await b.importInternal('configs/hardboundary')
    await b.importInternal('configs/itemban')
    await b.importInternal('configs/maxench')
    await b.importInternal('configs/maxstack')
    await b.importInternal('configs/modules')
    await b.importInternal('configs/worldboundary')
}
