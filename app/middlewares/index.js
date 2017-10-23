const path = require('path');
const compose = require('koa-compose');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const favicon = require('koa-favicon');
const session = require('koa-session');
const pugview = require('./pugview');
const router = require('../routes');

module.exports = function (app, config) {
    return compose([
        require('koa-static')(config.publicPath),
        favicon(path.resolve(config.rootPath, 'favicon.ico')),
        logger(),
        session(config.session, app),
        bodyparser({enableTypes: ['json', 'form', 'text']}),
        json(),
        pugview(config.viewPath),
        router.routes(),
    ])
};