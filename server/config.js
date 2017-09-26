const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

console.log(process.env)
module.exports = {
    viewPath: path.resolve(__dirname, 'views'),
    publicPath: path.resolve(__dirname, 'public'),
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    }
}