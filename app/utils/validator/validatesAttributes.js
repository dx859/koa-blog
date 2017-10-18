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

exports.required = function (value) {
    if (value == null) {
        return false;
    } else if (isString(value) && value.trim() === '') {
        return false;
    } else if (isArray(value) && value.length === 0) {
        return false;
    }

    return true;
};


exports.numeric = function (value) {
    return isNumeric(value)
};

exports.alphaDash = function (value) {
    if (!isString(value) && !isNumeric(value)) {
        return false;
    }

    return /^[\w\-]+$/.test(value)
};

exports.alphaNum = function (value) {
    if (!isString(value) && !isNumeric(value)) {
        return false;
    }

    return /^[\da-zA-Z]+$/.test(value)
};


exports.alpha = function (value) {
    if (!isString(value) && !isNumeric(value)) {
        return false;
    }

    return /^[a-zA-Z]+$/.test(value)
};

exports.array = function (value) {
    return isArray(value)
};

exports.email = function (value) {
    if (!isString(value)) {
        return false;
    }

    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)
};

exports.max = function (value, parameters, attributes) {
    requireParameterCount(1, parameters, 'max');
    let hasNumeric = !(attributes.indexOf('numeric') === -1);

    return sizeOf(value)===false ? false : sizeOf(value, hasNumeric) <= parameters[0]

};

exports.min = function (value, parameters, attributes) {
    requireParameterCount(1, parameters, 'min');
    let hasNumeric = !(attributes.indexOf('numeric') === -1);

    return sizeOf(value)===false ? false : sizeOf(value, hasNumeric) >= parameters[0]
};

exports.confirmed = function (value, parameters, attributes, data) {
    let password_confirm = parameters[0] ? parameters[0] : 'password_confirmation';
    return value === data[password_confirm]
};


exports.empty = function (value) {
    if (Array.isArray(value)) {
        return value.length === 0
    }
    return value === '' || value === null || value === undefined
};

function sizeOf(value, hasNumeric) {

    if (isNumeric(value) && hasNumeric) {
        return parseInt(value)
    } else if (isArray(value)) {
        return value.length
    }

    return (value+'').length
}