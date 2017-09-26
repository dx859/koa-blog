const pug = require('pug')
const path = require('path')

function pugView(basePath, options = {}) {
    options = Object.assign({}, {
        opts: {cache: process.env.NODE_ENV === 'production'},
        ext: 'pug',
    }, options)

    return function (ctx, next) {
        if (ctx.render) {
            return next()
        } else {
            ctx.render = function (filename, locals = {}) {
                let filenames = filename.split('.')
                filenames[filenames.length - 1] = filenames[filenames.length - 1] + '.' + options.ext
                let filePath = path.resolve(basePath, ...filenames)
                let fn = pug.compileFile(filePath, options.opts)
                let state = Object.assign(locals, locals, ctx.state || {})
                ctx.body = fn(state)
            }
            return next()
        }
    }
}

module.exports = pugView