const authService = require('../services/authService');

exports.index = async (ctx, next) => {

    let {username = 'daixi', email = 'd@x.com', password='123456'} = ctx.query;
    if (ctx.session.views == null) {
        ctx.session.views = Math.random()
    }

    let session = ctx.session;

    ctx.body = session;
};

exports.test = async (ctx, next) => {
    const db = require('../utils/dbschema');

    let res = await db('users')
        .where('id>?', '1')
        .groupBy('email')
        .orderBy('id desc')

        .select('id, username, email');

    ctx.body = res;
};