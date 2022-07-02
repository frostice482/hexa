import './common.js'
import './hardboundary.js'
import './itemban.js'
import './maxench.js'
import './maxstack.js'
import './modules.js'
import './worldboundary.js'

import pli from '../pli.js'
import type { config_common } from './common.js'
import type { config_hardboundary } from './hardboundary.js'
import type { config_itemban } from './itemban.js'
import type { config_maxench } from './maxench.js'
import type { config_maxstack } from './maxstack.js'
import type { config_modules } from './modules.js'
import type { config_worldboundary } from './worldboundary.js'

const aa = pli.internalModules['configs/index'] = async (b) => {
    return {
        common: await b.importInternal('configs/common') as Awaited<config_common>,
        hardBoundary: await b.importInternal('configs/hardboundary') as Awaited<config_hardboundary>,
        itemBan: await b.importInternal('configs/itemban') as Awaited<config_itemban>,
        maxEnch: await b.importInternal('configs/maxench') as Awaited<config_maxench>,
        maxStack: await b.importInternal('configs/maxstack') as Awaited<config_maxstack>,
        modules: await b.importInternal('configs/modules') as Awaited<config_modules>,
        worldBoundary: await b.importInternal('configs/worldboundary') as Awaited<config_worldboundary>,
    }
}

export type configs = ReturnType<typeof aa>
