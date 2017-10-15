const
    INSERT = 'insert',
    SELECT = 'select',
    UPDATE = 'update',
    DELETE = 'delete';


class queryString {
    constructor(tbName) {
        this._params = []
        this._table = tbName
        this._whereParams = []
        this._updateKey = []
        this._updateParams = []
        this.type = SELECT
    }

    table(table) {
        this._table = table
        return this
    }

    select(...selects) {
        this._select = selects.length === 0 ? ['*'] : selects
        this.type = SELECT
        return this
    }

    insert(obj) {
        this.type = INSERT
        let keys = [], params = [], sql=''
        if (Array.isArray(obj)) {
            let paramfillAll = []
            for (let i=0; i<obj.length; i++) {
                let paramfills = []
                for (let key in obj[i]) {
                    if (i === 0) {
                        keys.push(key)
                    }
                    paramfills.push('?')
                    params.push(obj[i][key])
                }
                paramfillAll.push(`(${paramfills.join(', ')})`)
            }

            sql = `INSERT ${this._table}(${keys.join(', ')}) VALUES${paramfillAll.join(', ')}`
        } else {
            let paramfills = []
            for (let key in obj) {
                keys.push(key)
                params.push(obj[key])
                paramfills.push('?')
            }
            sql = `INSERT ${this._table}(${keys.join(', ')}) VALUES(${paramfills.join(', ')})`
        }


        this._query = sql
        this._params = params
        return this
    }

    update(obj) {
        this.type = UPDATE
        for (let key in obj) {
            this._updateKey.push(key)
            this._updateParams.push(obj[key])
        }
        return this
    }

    delete() {
        this.type = DELETE
        return this
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

    joinLeft(join) {
        this._join = join
    }

    joinRight(join) {

    }

    join(join) {

    }

    groupBy(groupBy) {
        this._groupBy = groupBy
    }

    having(having) {
        this._having = having
    }

    orderBy(orderBy) {
        this._orderBy = orderBy
    }

    limit(limit, offset=0) {
        limit = parseInt(limit)
        offset = parseInt(offset)
        if (isNaN(limit)) throw Error('limit 必须为数字')
        if (isNaN(offset)) throw Error('offset 必须为数字')
        this._limit = limit < 0 ? 0 : limit
        this._offset = offset < 0 ? 0: offset
        return this
    }

    getQuery() {
        let where = '', select = '', limit = '';
        if (this._where) {
            where = `WHERE ${this._where.join(' AND ')}`
        }

        select = this._select!==undefined ? this._select.join(', ') : '*'
        if (this._limit != null) {
            if (this._offset !== 0) {
                limit = `LIMIT ${this._offset}, ${this._limit}`
            } else {
                limit = `LIMIT ${this._limit}`
            }
        }
        if (this.type === SELECT) {
            this._query = `SELECT ${select} FROM ${this._table} ${where} ${limit}`

            this._params = [...this._whereParams]

        } else if (this.type === INSERT) {

        } else if (this.type === UPDATE) {
            this._query = `UPDATE ${this._table} SET ${this._updateKey.map(t=>t+'=?').join(', ')} ${where}`
            this._params = this._updateParams.concat(this._whereParams)
        } else if (this.type === DELETE) {
            if (where === '') {
                throw Error('删除语句必须有条件')
            }
            this._query = `DELETE FROM ${this._table} ${where}`
            this._params = this._whereParams
        }

        return {query: this._query, params: this._params}
    }

}

module.exports = queryString
