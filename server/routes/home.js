const router = require('koa-router')()
const homeController = require('../controllers/homeController')

router
  .get('/', homeController.index)
  .get('/home/index', homeController.index)
  .get('/home/notice', homeController.notice)
  .get('/home/finish', homeController.finish)
  .get('/home/help', homeController.help)
  .get('/home/bid-detail', homeController.bidDetail)

module.exports = router



