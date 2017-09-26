const router = require('koa-router')()
const asserts = require('../middlewares/asserts')
const homeController = require('../controllers/homeController')
const adminController = require('../controllers/adminController')

router
    .use(asserts)
    .get('/', homeController.index)
    .get('/home/index', homeController.index)
    .get('/admin', adminController.index)


module.exports = router



