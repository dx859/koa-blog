const db = require('../utils/dbschema');


exports.addPost = async (userId, title, content) => {

    let res = await db('post').insert({
        user_id: userId,
        title,
        content,
    });

    return res.insertId;
};


exports.addTag = async (tag) => {
    let res = await db().query('INSERT IGNORE tags(tag) VALUES(?)', [tag]);

    if (res.insertId === 0) {
        return (await db('tags').where('tag=?', tag).select('id'))[0].id
    } else {
        return res.insertId
    }
};