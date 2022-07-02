import './configs/index.js'
import './libs/index.js'

import pli from "./pli.js";

pli.internalModules['main'] = async (b) => {
    await b.importInternal('configs/index')
}

pli.send()
