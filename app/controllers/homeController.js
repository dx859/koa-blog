exports.index = async (ctx, next) => {

    let n = ctx.session.views || 0;

    ctx.session.views = ++n;

    ctx.body = n;
};