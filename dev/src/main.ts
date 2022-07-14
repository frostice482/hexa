import './cc/index.js'
import './configs/index.js'
import './libs/index.js'
import './checks/index.js'
import './misc/index.js'

import pli from "./pli.js";
import { configs } from './configs/index.js';
import { libs_module } from './libs/module.js';

pli.internalModules['main'] = async (b) => {
    const configs = await b.importInternal('configs/index') as Awaited<configs>
    await b.importInternal('checks/index')
    await b.importInternal('cc/index')
    
    const o = {
        configs,
        module: await b.importInternal('libs/module') as Awaited<libs_module>
    }
    globalThis.hexa = o
    return o
}

pli.send()

import './test.js'
