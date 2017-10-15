const crypto = require('crypto');

exports.pageFormat = function (page, maxPage) {
    page = parseInt(page);
    if (isNaN(page) || page < 1) return 1;
    return page > maxPage ? maxPage : page
};

exports.md5 = function (str) {
    let hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex')
};

