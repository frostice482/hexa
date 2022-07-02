import './configs/index.js'
import { configs } from './configs/index.js';
import './libs/index.js'

import pli from "./pli.js";

pli.internalModules['main'] = async (b) => {
    const config = await b.importInternal('configs/index') as Awaited<configs>
    return {
        config
    }
}

pli.send()
