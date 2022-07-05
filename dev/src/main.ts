import './configs/index.js'
import './libs/index.js'
import './checks/index.js'

import pli from "./pli.js";
import { configs } from './configs/index.js';

pli.internalModules['main'] = async (b) => {
    const config = await b.importInternal('configs/index') as Awaited<configs>
    await b.importInternal('checks/index')
    return {
        config
    }
}

pli.send()
