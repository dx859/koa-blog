const authService = require('../services/authService')

exports.index = async (ctx, next) => {

    let {username, email, password} = ctx.query
    let res = await authService.addUser(username, email, password)

    ctx.body = res;
};