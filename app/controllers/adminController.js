const validator = require('../utils/validator/validator');
const postService = require('../services/postService');


exports.index = async (ctx, next) => {
    let {username} = ctx.session.user;

    ctx.render('admin.index', {username})
};


exports.editPost = async (ctx, next) => {
    ctx.render('admin.edit')
};


exports.getPost = async(ctx, next) => {

};


exports.addPost = async(ctx,next) => {
    let post = ctx.request.body;
    let valid = validator(post, {
        'title': 'max:150',
    });

    if (valid !== true) {
        return ctx.body = {post, valid}
    }


    let res = await postService.addTag('css');
    console.log(res);
    ctx.body = res
};

exports.updatePost = async(ctx, next) => {

};

exports.deletePost = async(ctx, next) => {

};