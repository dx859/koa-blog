const router = require('koa-router')()
const setTenantDB = require('../middlewares/getTenant')

const homeRouter = require('./home')

router.use('/:tenant', setTenantDB, homeRouter.routes())

module.exports = router