const authService = require('../services/authService');

exports.login = async(ctx, next) => {
    let {username='', password=''} = ctx.query;

    let res = await authService.passport(username, password);

    if (res) {
        ctx.session.user = res;
        ctx.body = 'ok';
    } else {
        ctx.body = 'notfount';
    }




};

