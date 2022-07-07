import { BlockLocation, ItemStack, MinecraftItemTypes, world } from "mojang-minecraft"
import * as gt from 'mojang-gametest'

gt.register("HEXA", "stresstest", (test) => {
    const dirt = new ItemStack(MinecraftItemTypes.dirt, 64)

    const spawnLoc = new BlockLocation(1, 2, 1)
    for (let i = 0; i < 40; i++) {
        const plr = test.spawnSimulatedPlayer(spawnLoc, `Dummy${i}-${(100000000000 + Math.floor(Math.random() * 900000000000)).toString(36)}`);
        const c = plr.getComponent('inventory').container
        for (let i = 0, m = c.size; i < m; i++) c.setItem(i, dirt)
    }

    let c = 0
    const aa = world.events.tick.subscribe(({deltaTime}) => c += deltaTime)

    const duration = 200

    test.startSequence()
        .thenIdle(duration)
        .thenExecute(() => {
            world.events.tick.unsubscribe(aa)
            try { world.getDimension('overworld').runCommand(`tellraw @a {"rawtext":[{"text":"${(duration / c).toFixed(2)} tps"}]}`) }
            catch (e) { console.warn(e) }
        })
        .thenSucceed()
})
    .maxTicks(2147483647)
    .structureName("ComponentTests:platform")
