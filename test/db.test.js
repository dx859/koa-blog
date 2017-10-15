const assert = require('assert');
const queryString = require('../app/utils/queryString')


describe('queryString', function () {
    describe('selectquery', function () {

        it('select no params', function () {
            let querystring = new queryString()
            let {query, params}  = querystring.table('users').select().getQuery()
            assert.equal('SELECT * FROM users', query.trim())
        })

        it('select no params no select', function () {
            let querystring = new queryString()
            let {query, params}  = querystring.table('users').getQuery()
            assert.equal('SELECT * FROM users', query.trim())
        })

        it('select select', function () {
            let querystring = new queryString()
            let {query, params}  = querystring.table('users').select('username', 'email').getQuery()
            assert.equal('SELECT username, email FROM users', query.trim())
        })

        it('select where no parmas', function () {
            let querystring = new queryString()
            let {query, params}  = querystring.table('users').where('id=12').select('username', 'email').getQuery()
            assert.equal('SELECT username, email FROM users WHERE id=12', query.trim())
            assert.deepEqual([], params)
        })

        it('select where parmas', function () {
            let querystring = new queryString()
            let {query, params}  = querystring.table('users').where('id=?', 12).select('username', 'email').getQuery()
            assert.equal('SELECT username, email FROM users WHERE id=?', query.trim())
            assert.deepEqual([12], params)
        })

        it('select two where parmas', function () {
            let querystring = new queryString()
            let {query, params}  = querystring.table('users')
                .where('id=? AND username=?', 12, 'daixi')
                .where('password=?', 123456)
                .select('username', 'email').getQuery()
            assert.equal('SELECT username, email FROM users WHERE id=? AND username=? AND password=?', query.trim())
            assert.deepEqual([12, 'daixi', 123456], params)
        })

        it('select limit', function () {
            let querystring = new queryString()
            let {query, params}  = querystring.table('users').limit(10).getQuery()
            assert.equal('SELECT * FROM users  LIMIT 10', query)
        })
        it('select limit offset', function () {
            let querystring = new queryString()
            let {query, params}  = querystring.table('users').limit(10, 12).getQuery()
            assert.equal('SELECT * FROM users  LIMIT 12, 10', query)
        })
        it('select -limit -offset', function () {
            let querystring = new queryString()
            let {query, params}  = querystring.table('users').limit(-10, -12).getQuery()
            assert.equal('SELECT * FROM users  LIMIT 0', query)
        })

    })

    describe('insertquery', function () {
        it('insert one', function () {
            let querystring = new queryString()
            let obj = {
                username: 'daixi',
                password: '123456',
                email: 'd@x.com'
            }
            let {query, params} = querystring.table('users').insert(obj).getQuery()

            assert.equal('INSERT users(username, password, email) VALUES(?, ?, ?)', query)
            assert.deepEqual(['daixi', '123456', 'd@x.com'], params)
        })

        it('insert multi', function () {
            let querystring = new queryString()
            let obj = [{
                username: 'daixi',
                password: '123456',
                email: 'd@x.com'
            },
                {
                    username: 'zhangsan',
                    password: '222222',
                    email: 'zs@x.com'
                },]
            let {query, params}  = querystring.table('users').insert(obj).getQuery()

            assert.equal('INSERT users(username, password, email) VALUES(?, ?, ?), (?, ?, ?)', query)
            assert.deepEqual(['daixi', '123456', 'd@x.com', 'zhangsan', '222222', 'zs@x.com'], params)
        })

    })

})