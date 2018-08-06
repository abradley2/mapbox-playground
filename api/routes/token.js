exports.get = async function (ctx) {
    ctx.response.body = {token: ctx.config.MB_PUBLIC_TOKEN}
    ctx.response.status = 200
}

exports.get.schema = {
    body: {}
}
