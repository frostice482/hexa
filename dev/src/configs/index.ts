import './banlist.js'
import './blacklist.js'
import './common.js'
import './hardboundary.js'
import './id.js'
import './itemban.js'
import './maxench.js'
import './maxstack.js'
import './modules.js'
import './mutelist.js'
import './renewable.js'
import './whitelist.js'
import './worldboundary.js'

import pli from '../pli.js'
import type { config_banlist } from './banlist.js'
import type { config_blacklist } from './blacklist.js'
import type { config_common } from './common.js'
import type { config_hardboundary } from './hardboundary.js'
import type { config_id } from './id.js'
import type { config_itemban } from './itemban.js'
import type { config_maxench } from './maxench.js'
import type { config_maxstack } from './maxstack.js'
import type { config_modules } from './modules.js'
import type { config_mutelist } from './mutelist.js'
import type { config_renewable } from './renewable.js'
import type { config_whitelist } from './whitelist.js'
import type { config_worldboundary } from './worldboundary.js'

const aa = pli.internalModules['configs/index'] = async (b) => {
    return {
        banlist: await b.importInternal('configs/banlist') as Awaited<config_banlist>,
        blacklist: await b.importInternal('configs/blacklist') as Awaited<config_blacklist>,
        common: await b.importInternal('configs/common') as Awaited<config_common>,
        hardBoundary: await b.importInternal('configs/hardboundary') as Awaited<config_hardboundary>,
        id: await b.importInternal('configs/id') as Awaited<config_id>,
        itemBan: await b.importInternal('configs/itemban') as Awaited<config_itemban>,
        maxEnch: await b.importInternal('configs/maxench') as Awaited<config_maxench>,
        maxStack: await b.importInternal('configs/maxstack') as Awaited<config_maxstack>,
        modules: await b.importInternal('configs/modules') as Awaited<config_modules>,
        mutelist: await b.importInternal('configs/mutelist') as Awaited<config_mutelist>,
        renewable: await b.importInternal('configs/renewable') as Awaited<config_renewable>,
        whitelist: await b.importInternal('configs/whitelist') as Awaited<config_whitelist>,
        worldBoundary: await b.importInternal('configs/worldboundary') as Awaited<config_worldboundary>,
    }
}

export type configs = ReturnType<typeof aa>
