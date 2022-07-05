import './configs/index.js'
import './libs/index.js'
import './checks/index.js'

import pli from "./pli.js";
import { configs } from './configs/index.js';
import { checks } from './checks/index.js';

pli.internalModules['main'] = async (b) => {
    const configs = await b.importInternal('configs/index') as Awaited<configs>
    const modules = await b.importInternal('checks/index') as Awaited<checks>
    await b.importInternal('checks/index')
    return {
        configs,
        modules
    }
}

pli.send()
