
function auth(ctx, next) {

    if (ctx.session.user == null) {
        ctx.redirect(`/auth/login?url=${ctx.href}`);
    } else {
        return next()
    }

}

module.exports = auth;