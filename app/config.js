const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '..', '.env')});

module.exports = {
    viewPath: path.resolve(__dirname, 'views'),
    publicPath: path.resolve(__dirname, '..', 'public'),
    rootPath: path.resolve(__dirname, '..'),
    assertsHost: process.env.ASSERTS_HOST || '',
    session: {
        key: 'sess_id',
        maxAge: 10*1000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: true,
        // store: require('./utils/sessStore'),
    },
    keys: ['koa blog secret', 'im a good boy'],
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    }
};
