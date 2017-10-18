const i18n_default = require('./default');

const {i18n} = require('../config');

if (i18n) {
    module.exports = Object.assign({}, i18n_default, require(`./${i18n}`))
} else {
    module.exports = i18n_default
}