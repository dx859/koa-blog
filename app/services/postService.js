const db = require('../utils/dbschema');


exports.getPosts = async (user_id) => {
    return await db('posts').where('user_id=?', user_id)
        .select('id, title, content, DATE_FORMAT(update_at, "%Y-%m-%d %H:%i:%s") update_at, DATE_FORMAT(create_at, "%Y-%m-%d %H:%i:%s") create_at')
};

exports.addPost = async (user_id, title, content) => {
    let res = await db('posts').insert({user_id, title, content});
    return res.insertId;
};

exports.updatePost = async (id, title, content) => {

    let {affectedRows} = await db('posts').where(`id=?`, id).update({title, content});
    return affectedRows;
};


exports.getPost = async (id) => {
    let sql = `
    SELECT posts.id, posts.title, posts.content, posts.update_at, posts.create_at,GROUP_CONCAT(tags.id) tag_ids, GROUP_CONCAT(tags.tag) tags FROM posts
        LEFT JOIN posts_tags ON posts.id = posts_tags.post_id
        LEFT JOIN tags ON posts_tags.tag_id = tags.id
        WHERE posts.id=?
    `;
    return (await db().query(sql, [id]))[0]
};


exports.getTags = async (id) => {

};

exports.addTag = async (tag) => {
    let res = await db('tags').where('tag=?', tag).selectOne();
    let insertId;
    if (res === undefined) {
        ({insertId} = await db('tags').insert({tag: tag}))
    } else {
        insertId = res.id
    }
    return insertId
};


exports.addPostTag = async (post_id, tag_id) => {
    let res = await db().query('INSERT IGNORE posts_tags(post_id, tag_id) VALUES(?, ?)', [post_id, tag_id]);

    return {status: 1, data: res}
};


exports.deletePostTag = async (post_id, tag_id) => {
    let {affectedRows} = await db('posts_tags').where('post_id=? AND tag_id=?', post_id, tag_id).delete();
    return affectedRows
};