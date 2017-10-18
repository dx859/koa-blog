
function auth(ctx, next) {

    if (ctx.session.user == null) {
        ctx.redirect('/auth/login');
    } else {
        return next()
    }

}

module.exports = auth;