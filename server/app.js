const Koa = require('koa')
const app = new Koa()

const onerror = require('koa-onerror')

const router = require('./routes')

const middlewares = require('./middlewares')

// error handler
onerror(app)

app.use(middlewares)

// routes
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
