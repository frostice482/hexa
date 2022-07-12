import pli from "../pli.js";

const aa = pli.internalModules['misc/plrjson'] = (b) => new Promise<boolean>(async res => {
    const { world } = await b.import('mc')
    const { server, execCmd } = await b.import('se')

    const [plr] = world.getPlayers()
    if (plr) return res( !execCmd(`event entity @s hexa:dummy`, plr, true).statusCode )

    const aa = server.ev.playerLoad.subscribe((plr) => {
        server.ev.playerLoad.unsubscribe(aa)
        res( !execCmd(`event entity @s hexa:dummy`, plr, true).statusCode )
    })
})

export type misc_plrjson = ReturnType<typeof aa>
