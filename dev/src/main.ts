import './configs/index.js'
import './libs/index.js'
import './checks/index.js'

import pli from "./pli.js";
import { configs } from './configs/index.js';
import { libs_module } from './libs/module.js';

pli.internalModules['main'] = async (b) => {
    const configs = await b.importInternal('configs/index') as Awaited<configs>
    await b.importInternal('checks/index')
    return {
        configs,
        module: await b.importInternal('libs/module') as Awaited<libs_module>
    }
}

pli.send()

import './test.js'
