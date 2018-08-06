const config = {
    MB_PUBLIC_TOKEN: null
}
if (process.env.NODE_ENV === 'development') {
    try {
        Object.assign(config, require('./local-config'))
    } catch (err) {
        global.console.log('no local-config.json found in root directory, add one!')
    }
}

module.exports = config
