const db = require('../utils/promisedb')

exports.addUser = async (username, password, email) => {

    return await db.insert('users', {username, password, email})

}