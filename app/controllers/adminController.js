const validator = require('../utils/validator/validator');
const commonUtil = require('../utils/common');
const postService = require('../services/postService');
const authService = require('../services/authService');
const marked = require('marked');

exports.index = async (ctx, next) => {
    let {user} = ctx.session;

    let posts = await postService.getPosts(user.id);
    ctx.render('admin.index', {user, posts})
};


exports.editPost = async (ctx, next) => {
    let res = await postService.getPost(ctx.params.id);

    if (res === undefined) {
        return next()
    }

    ctx.render('admin.edit', res)
};


exports.getPost = async(ctx, next) => {
    let post = await postService.getPost(ctx.params.id);
    console.log(post);
    if (!post) {
        return next()
    }

    post.content = marked(post.content);
    ctx.render('admin.post', {post})
};


exports.addPost = async(ctx,next) => {
    let id = await postService.addPost(ctx.session.user.id, '', '');
    ctx.redirect(`/admin/post/edit/${id}`)
};

exports.updatePost = async(ctx, next) => {
    let {title, content} = ctx.request.body;
    if (title.length > 150) {
        return ctx.body = {status: 0, message:'标题不能超过150个字'}
    }

    let affectRows = await postService.updatePost(ctx.params.id, title, content);
    if (affectRows === 1) {
        ctx.body = {status: 1}
    } else {
        ctx.body = {status: 0, message: '跟新失败'}
    }


};

exports.addTag = async(ctx, next) => {
    let {postId, tag} = ctx.request.body;

    let valid = validator({postId, tag}, {
        postId: 'required|numeric',
        tag: 'required|max:80'
    });

    if (valid !== true) {
        return ctx.body = {status: 0, errorObj: valid, message: '参数错误'}
    }

    let hasPostId = await authService.exists('posts', 'id', postId);
    if (hasPostId === false) {
        return ctx.body = {status: 0, message: 'postId不存在'}
    }

    let tagId = await postService.addTag(tag);

    await postService.addPostTag(postId, tagId);


    ctx.body = {status: 1, data: {tag, id: tagId}}

};

exports.deletePost = async(ctx, next) => {

};


exports.deletePostTag = async(ctx, next) => {
    let {postId, tagId} = ctx.request.body;
    let valid = validator({postId, tagId}, {
        postId: 'required|numeric',
        tagId: 'required|numeric'
    });

    if (valid !== true) {
        return ctx.body = {status: 0, message: '参数错误', errerObj: valid}
    }

    let res = await postService.deletePostTag(postId, tagId);
    if (res === 1) {
        ctx.body = {status: 1}
    } else {
        ctx.body = {status: 0, message: '删除失败'}
    }

};

