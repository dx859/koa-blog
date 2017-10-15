
function auth(ctx, next) {
    if (ctx.session.user == null) {
        ctx.redirect('/login');
        return next()
    }
    return next()
}

module.exports = auth;