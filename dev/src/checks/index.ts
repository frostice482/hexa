import './namespoof.js'

import pli from '../pli.js'

pli.internalModules['checks/index'] = (b) => {
    b.importInternal('checks/namespoof')
}
