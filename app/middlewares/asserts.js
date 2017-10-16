const url = require('url');
const {assertsHost} = require('../config');


function asserts(ctx, next) {
    if (ctx.state.assertsUrl) return next();
    ctx.state.assertsUrl = function (u) {
        return url.resolve(assertsHost, u)
    };
    return next()
}

module.exports = asserts;