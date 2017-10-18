const validatesAttributes = require('./validatesAttributes');
const replaceAttributes = require('./replaceAttributes');
const {uppercaseFristWord} =require('../common');
const i18n = require('../../i18n');

class Validator {
    //translator, data, rules, messages = [], attributes = []
    constructor(data, rules, opts) {
        this.opts = Object.assign({
            field:{},
            translator: 'default',
            messages: {},
            validatesFn: {}
        }, opts);
        this.translator = this.opts.translator;
        this.customMessages = this.opts.messages;
        this.rules = {};
        this.keys = [];

        this.data = this.parseData(data);
        this.parseRule(rules)
    }

    parseData(data) {
        return data;
    }

    parseRule(rules) {
        for (let key in rules) {
            let ruleString = rules[key];
            let attributes = [], params = [];
            // console.log(ruleString);
            ruleString.split('|').forEach(rule => {
                let item = rule.split(':');
                attributes.push(item[0]);
                params.push(item.slice(1))
            });

            this.rules[key] = {attributes, params}
        }
    }

    validator() {
        let message = {};
        let flag = true;
        for (let key in this.rules) {
            let value = this.data[key];

            if (this.rules[key].attributes.indexOf('required') !== -1 || !validatesAttributes.empty(value)) {
                this.rules[key].attributes.forEach((attr, index) => {
                    let params = this.rules[key].params[index];
                    let validatesFn;
                    if (this.opts.validatesFn[attr]) {
                        validatesFn = this.opts.validatesFn[attr]
                    } else {
                        validatesFn = validatesAttributes[attr];
                    }

                    if (typeof validatesFn !== "function") {
                        throw Error(attr + ' 验证方法不支持')
                    }
                    if (!validatesFn(value, params, this.rules[key].attributes, this.data)) {
                        flag = false;
                        message[key] = message[key] ? message[key] : [];
                        let msg = this.customMessages[attr]? this.customMessages[attr] : i18n.messages[attr];
                        if (!msg) {
                            msg = i18n.messages.common
                        }
                        msg = replaceAttributes.replaceCommon(msg, this.opts.field[key] ? this.opts.field[key]: key, params);
                        message[key].push(msg)

                    }
                })
            }

        }
        return flag === true ? true : message
    }

}


module.exports = function (...args) {
    return (new Validator(...args)).validator()
};
