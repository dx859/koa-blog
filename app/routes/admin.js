const router = require('koa-router')();
const asserts = require('../middlewares/asserts');
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth')

router
    .use(asserts)
    .use(auth)
    .get('/admin', adminController.index);


module.exports = router;
