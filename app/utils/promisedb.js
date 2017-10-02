const mysql = require('mysql')
const queryString = require('./queryString')
const config = require('../config')

class DB {
    constructor(opts) {
        this.conn = null
        this.opts = opts
        this.querystr = ''
        if (opts != null) {
            this.conn = mysql.createPool(Object.assign({connectionLimit: 2}, opts))
        }
    }

    configure(opts) {
        this.opts = opts
        if (this.conn) this.end()
        this.conn = mysql.createConnection(opts)
    }

    // table(tbName) {
    //     if (typeof tbName !== 'string') {
    //         throw Error('tbName required and must be string')
    //     }
    //     this.querystring = new queryString(tbName)
    //     this.querystring.get = this.get.bind(this)
    //     this.querystring.save = this.save.bind(this)
    //     return this.querystring
    // }

    async get() {
        let {query, params} = this.querystring.getQuery()
        return await this.query(query, params)
    }

    async getOne() {
        this.querystring.limit(1)
        let {query, params} = this.querystring.getQuery()
        let [res] = await this.query(query, params)
        return res
    }

    select(tbName, fields = ['*']) {
        this.querystring = new queryString(tbName)
        this.querystring.select(...fields)
        this.querystring.get = this.get.bind(this)
        this.querystring.getOne = this.getOne.bind(this)
        return this.querystring
    }

    async insert(tbName, objs) {
        this.querystring = new queryString(tbName)
        this.querystring.insert(objs)
        let {query, params} = this.querystring.getQuery()
        return await this.query(query, params)
    }

    delete(tbName) {
        this.querystring = new queryString(tbName)
        this.querystring.delete()
        this.querystring.del = this.del.bind(this)
        return this.querystring
    }

    async del() {
        let {query, params} = this.querystring.getQuery()
        return await this.query(query, params)
    }

    update(tbName, objs) {
        this.querystring = new queryString(tbName)
        this.querystring.update(objs)
        this.querystring.up = this.up.bind(this)
        return this.querystring
    }

    async up() {
        let {query, params} = this.querystring.getQuery()
        return await this.query(query, params)
    }

    query(sql, data) {
        return new Promise((resolve, reject) => {
            if (data == null) {
                this.conn.query(sql, function (err, results) {
                    if (err)
                        reject(err)
                    else
                        resolve(results)

                })
            } else {
                this.conn.query(sql, data, function (err, results) {
                    if (err)
                        reject(err)
                    else
                        resolve(results)
                })
            }
        })
    }

    end() {
        this.conn.end()
    }
}

module.exports = new DB(config.db);

