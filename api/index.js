const fs = require('fs')
const path = require('path')
const logger = require('pino')()
const Koa = require('koa')
const cors = require('@koa/cors')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const config = require('../config')

logger.info('starting api')

const index = fs.readFileSync(path.join(__dirname, '../static/index.html'), 'utf8')

async function start() {
    const app = new Koa()
    const host = process.env.HOST || '127.0.0.1'
    const port = process.env.PORT || 3000

    app.use(cors())
    app.use(bodyParser())
    app.use(serve(path.join(__dirname, '../static')))
    app.use(async (ctx, next) => {
        ctx.logger = logger
        ctx.config = config
        try {
            await next()
        } catch (err) {
            logger.error(err)
            ctx.response.status = 500
            ctx.response.body = {error: err.message}
        }
    })

    require('./routes/_index')(app)

    app.use(async (ctx, next) => {
        await next()
        // Support pushstate routing
        if (
            !ctx.response.body &&
            !ctx.response.status &&
            ctx.request.get('Accept').toLowerCase().includes('html')
        ) {
            ctx.response.body = index
            ctx.response.status = 200
        }
    })

    app.listen(port, host)
    logger.info('Server listening on ' + host + ':' + port)
}

start()
