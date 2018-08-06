const withValidation = require('@abradley2/koa-validated-route')

module.exports = function (app) {
    app.use(withValidation.get('/token', require('./token').get))
}
