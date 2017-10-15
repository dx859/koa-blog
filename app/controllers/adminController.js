
exports.index = async (ctx, next) => {
    ctx.body = {user: ctx.session.user}

}