const router = require('koa-router')();
const asserts = require('../middlewares/asserts');
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');


router
    .use(asserts)
    .get('/', homeController.index)
    .get('/home/index', homeController.index)
    .get('/test', homeController.test)
    .get('/login', authController.login)


module.exports = router;



