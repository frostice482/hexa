import bridgeCli from "./bridgecli.js";

const pli = new bridgeCli('hexa', {
    name: 'Hexa',
    description: 'A plugin that provides protection against hackers.',
    author: ['FrostIce482'],
    version: 'v0.0.1',
    versionCode: 0.0001,
    internalModules: Object.create(null),
    canBeUnloaded: true
})

export default pli
