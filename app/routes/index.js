const Router = require('koa-router');

const asserts = require('../middlewares/asserts');
const auth = require('../middlewares/auth');
const pugView = require('../middlewares/pugview');

const homeController = require('../controllers/homeController');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');


const router = new Router();
const homeRouter = new Router();
const adminRouter = new Router();
const authRouter = new Router();

router.get('/', asserts, homeController.index);

homeRouter
    .use(asserts)
    .get('/', homeController.index)
    .get('/home/index', homeController.index)
    .get('/test', homeController.test)
    .get('/login', authController.login)
    .get('/edit', homeController.edit);

adminRouter
    .use(asserts)
    .use(auth)
    .get('/', adminController.index)
    .get('/post', adminController.editPost)
    .get('/post/:id', adminController.getPost)
    .post('/post', adminController.addPost)
    .post('/post/:id', adminController.updatePost)
    .post('/post/delete/:id', adminController.deletePost)


authRouter
    .use(asserts)
    .get('/login', authController.login)
    .get('/register', authController.register)
    .get('/password', auth, authController.modifyPassword)
    .post('/password',auth, authController.updateUser)
    .post('/session', authController.session)
    .post('/user', authController.user);


router.use('/home', homeRouter.routes(), homeRouter.allowedMethods());
router.use('/admin', adminRouter.routes(), adminRouter.allowedMethods());
router.use('/auth', authRouter.routes(), authRouter.allowedMethods());


module.exports = router;