const db = require('./promisedb');

class DBSchema {
    constructor(tbName) {
        this._table = tbName;
        this._params = [];
        this._whereParams = [];
        this._updateKey = [];
        this._updateParams = [];
    }

    table(tbName) {
        this._table = tbName;
        return this;
    }

    async select(...selects) {
        let params = [], where = '', limit = '', groupBy='', orderBy='' ,select = '';

        if (selects.length === 0) {
            select = '*';
        } else if(selects.length === 1) {
            select = selects[0];
        } else {
            select = selects.join(',');
        }

        if (this._where) {
            where = ` WHERE ${this._where.join(' AND ')}`
            params = params.concat(this._whereParams);
        }

        orderBy = this._orderBy ? ` ORDER BY ${this._orderBy}` : '';
        groupBy = this._groupBy ? ` GROUP BY ${this._groupBy}` : '';


        if (this._limit !== undefined) {
            if (this._offset !== 0) {
                limit = ` LIMIT ${this._offset}, ${this._limit}`
            } else {
                limit = ` LIMIT ${this._limit}`
            }
        }

        let sql = `SELECT ${select} FROM ${this._table}${where}${groupBy}${orderBy}${limit}`;

        return await db.query(sql, params);
    }

    async update(data) {
        let keys = Object.keys(data);
        let params = Object.values(data);
        let where = '';

        if(!this._where) {
            throw Error('更新语句必须有where条件')
        } else {
            where = ` WHERE ${this._where.join(' AND ')}`;
            params = params.concat(this._whereParams);
        }

        let sql = `UPDATE ${this._table} SET ${keys.map(key=> key+'=?').join(',')}${where}`;
        return await db.query(sql, params);
    }

    async insert(data) {
        let keys = [], params = [], sql='';
        if (Array.isArray(data)) {
            let paramfillAll = [];
            for (let i=0; i<data.length; i++) {
                let paramfills = [];
                for (let key in data[i]) {
                    if (i === 0) {
                        keys.push(key)
                    }
                    paramfills.push('?');
                    params.push(data[i][key])
                }
                paramfillAll.push(`(${paramfills.join(', ')})`)
            }

            sql = `INSERT ${this._table}(${keys.join(', ')}) VALUES${paramfillAll.join(', ')}`
        } else {
            let paramfills = [];
            for (let key in data) {
                keys.push(key);
                params.push(data[key]);
                paramfills.push('?')
            }
            sql = `INSERT ${this._table}(${keys.join(', ')}) VALUES(${paramfills.join(', ')})`
        }

        return await db.query(sql, params);
    }

    async delete() {
        let where = '', params = [];
        if(!this._where) {
            throw Error('更新语句必须有where条件')
        } else {
            where = ` WHERE ${this._where.join(' AND ')}`;
            params = params.concat(this._whereParams);
        }
        let sql = `DELETE FROM ${this._table}${where}`;

        return await db.query(sql, params)
    }

    where(where, ...params) {
        if (where.split('?').length - 1 !== params.length) {
            throw Error('参数不匹配')
        }
        if (params.length !== 0) {
            this._whereParams = this._whereParams.concat(params)
        }

        if (this._where == null) {
            this._where = [where]
        } else {
            this._where.push(where)
        }

        return this
    }

    join(join) {

    }

    leftJoin(join) {

    }

    rightJoin(join) {

    }

    groupBy(groupBy) {
        this._groupBy = groupBy;
        return this;
    }

    having(having) {
        this._having = having;
    }

    orderBy(orderBy) {
        this._orderBy = orderBy;
        return this;
    }

    limit(limit, offset=0) {
        limit = parseInt(limit);
        offset = parseInt(offset);
        if (isNaN(limit)) throw Error('limit 必须为数字');
        if (isNaN(offset)) throw Error('offset 必须为数字');
        this._limit = limit < 0 ? 0 : limit;
        this._offset = offset < 0 ? 0: offset;
        return this
    }



    queryBuild() {

    }

    async query(sql, parmas) {
        return await db.query(sql, parmas);
    }

}

module.exports = function (tbName) {
    return new DBSchema(tbName)
};