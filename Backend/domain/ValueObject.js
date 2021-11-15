const { isObject } = require("util");

exports.ValueObject = class {

    constructor(data, opt) {
        let _data = {};
        for (const p in data)
            _data[p] = opt[p];
        this._data = Object.freeze(_data);
    }

    toString() {
        return JSON.stringify(this._data);
    }
}
