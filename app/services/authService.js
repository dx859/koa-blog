const db = require('../utils/dbschema');
const md5 = require("../utils/common").md5;

exports.passport = async(username, password) => {
    let [user] = await db('users').where('username=? AND password=?', username, md5(password)).select('id, username, email');

    return user;
};

exports.addUser = async(username, password, email) => {
    password = md5(password);
    return await db('users').insert({username, password, email});
};

exports.updatePassword = async(username, newPassword) => {
    return await db('users').where('username=?', username).update({password: md5(newPassword)})
};

exports.exists = async(table, column, value) => {
    let res = await db(table).where(`${column}=?`, value).select();
    return res.length !== 0
};
