
function isString(value) {
    return typeof value === 'string'
}

function isNumeric(value) {
    return (typeof value === 'number' || typeof value === 'string') &&
        !isNaN(value - parseFloat(value))
}

function isArray(value) {
    return Array.isArray(value)
}

function requireParameterCount(count, parameters, rule) {
    if (parameters.length < count)
        throw Error(`Validation rule ${rule} requires at least ${count} parameters.`)
}

/**
 * 验证字段是否为 null, undefined, 空字符串或全为空格的字符串， 空数组
 * @param attribute
 * @param value
 * @returns {boolean}
 */
exports.required = function (attribute, value) {
  if (value == null) {
      return false;
  } else if (isString(value) && value.trim() === '') {
      return false;
  } else if (isArray(value) && value.length === 0) {
      return false;
  }

  return true;
};

/**
 * 验证字段值是否仅包含字母、数字、破折号（ - ）以及下划线（ _ ）。
 * @param attribute
 * @param value
 */
exports.alphaDash = function (attribute, value) {
    if (!isString(value) && !isNumeric(value)) {
        return false;
    }

    return /^[\w\-]+$/.test(value)
};

exports.alphaNum = function () {
    if (!isString(value) && !isNumeric(value)) {
        return false;
    }

    return /^[\da-zA-Z]+$/.test(value)
};


exports.alpha = function () {
    if (!isString(value) && !isNumeric(value)) {
        return false;
    }

    return /^[a-zA-Z]+$/.test(value)
};

exports.array = function (attribute, value) {
    return isArray(value)
};

exports.email = function (attribute, value) {
    if (!isString(value)) {
        return false;
    }

    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)
};

exports.max = function (attribute, value, parameters) {
    requireParameterCount(1, parameters, 'max');


};