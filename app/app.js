const Koa = require('koa');
const app = new Koa();
const config = require('./config');

app.keys = config.keys;

const onerror = require('koa-onerror');

const middlewares = require('./middlewares');

// error handler
onerror(app);

// middlewares
app.use(middlewares(app, config));

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
