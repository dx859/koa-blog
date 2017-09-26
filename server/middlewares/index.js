const compose = require('koa-compose')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const pugview = require('./pugview')
const router = require('../routes')

const config = require('../config')

module.exports = compose([
    bodyparser({enableTypes: ['json', 'form', 'text']}),
    json(),
    require('koa-static')(config.publicPath),
    logger(),
    pugview(config.viewPath),
    router.routes(),
    router.allowedMethods()
])