function ignoreAssets(mw) {
    return async function (ctx, next) {
        if (/(\.css|\.js|\.icon|\.jpg|\.jpeg|\.png|\.gif)$/.test(ctx.originalUrl)) {
            await next()
        } else {
            await mw.call(this, ctx, next)
        }
    }
}

module.exports = ignoreAssets