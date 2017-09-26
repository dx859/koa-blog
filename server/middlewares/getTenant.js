const {getTenant} = require('../services/baseService')

async function setTenantDB(ctx, next) {
    let tenantCode = ctx.params.tenant

    ctx.tenant = await getTenant(tenantCode)

    if (ctx.tenant !== undefined) {
        await next()
    } else {
        ctx.status = 404
        ctx.render('error', {message: '该租户不存在', error: {status: ctx.status}})
    }

}

module.exports = setTenantDB