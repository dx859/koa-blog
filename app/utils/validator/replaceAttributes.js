exports.replaceCommon = function (message, attribute, parameters) {
    return message.replace(':field', attribute).replace(/\$([\d]+)/g, (match, $) => parameters[$]);
};