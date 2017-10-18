const authService = require('../services/authService');
const validator = require('../utils/validator/validator');

exports.login = async (ctx, next) => {
    ctx.render('auth.login')
};


exports.register = async (ctx, next) => {
    ctx.render('auth.register')
};

exports.modifyPassword = async (ctx, next) => {
    ctx.render('auth.password')
};

exports.user = async (ctx, next) => {
    let post = ctx.request.body;
    let valid = validator(post, {
        username: 'required|max:30',
        password: 'required|confirmed|min:6|max:30',
        email: 'email'
    });

    let {username, password, email} = post;

    if (valid === true) {
        let isExists = await authService.exists('users', 'username', username);

        if (isExists === true) {
            ctx.body = {post, message: {username: ['用户名已存在']}}
        } else {
            let res = await authService.addUser(username, password, email);
            ctx.session.user = {id: res.insertId, username: username, email: email};
            ctx.body = res
        }

    } else {
        ctx.body = {post, message: valid}
    }

};

exports.session = async (ctx, next) => {
    let {username = '', password = ''} = ctx.request.body;

    let res = await authService.passport(username, password);

    if (res) {
        ctx.session.user = res;
        ctx.body = 'ok';
    } else {
        ctx.body = '用户名密码错误';
    }
};

exports.updateUser = async (ctx, next) => {
    let post = ctx.request.body;
    let valid = validator(post, {
        password: 'required',
        new_password: 'required|min:6|max:30|confirmed:new_password_confirmation',
    });

    if (valid !== true) {
        return ctx.body = {post, message: valid}
    }
    let username = ctx.session.user.username;

    let {password, new_password }= post;

    let res = await authService.passport(username, password);

    if (res) {
        await authService.updatePassword(username, new_password)
        ctx.body = '修改成功'
    } else {
        ctx.body = {post, message: {password: ['密码错误']}}
    }

};
