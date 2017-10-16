class Validator {
    constructor(translator, data, rules, messages=[], attributes=[]) {
        this.initialRules = rules;
        this.translator = translator;
        this.customMessage = messages;
        this.customAttributes = attributes;

        this.data = this.parseData(data);
        this.setRules(rules)
    }

    parseData(data) {
        return data;
    }

    setRules(rules) {

    }


}