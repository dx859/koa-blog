const authService = require('../services/authService');

exports.index = async (ctx, next) => {

    ctx.body = session;
};


exports.edit = async (ctx, next) => {


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
