
const db = require('../utils/dbschema');
const md5 = require("../utils/common").md5;

exports.passport = async(username, password) => {
    console.log(password)
    let [user] = await db('users').where('username=? AND password=?', username, md5(password)).select('id, username, email');

    return user;
};