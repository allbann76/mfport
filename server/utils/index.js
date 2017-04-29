'use strict';

/**
 * @public
 * @param {string} tpl
 * @param {object} data
 * @return {string}
 */
function usy(tpl, data) {
    const regExp = /\${(\w+)(:[\w, ]+)?}/g;

    return tpl.replace(regExp, function (match, name, args) {
        const dateToInterpolate = data[name];
        let fnArgs = [];

        if (args) {
            fnArgs = args.slice(1).split(',').map(s => s.trim());
            //.map(JSON.parse.bind(JSON))
        }

        return exec(dateToInterpolate, fnArgs);
    });
}

/**
 * @private
 * @param {*} value
 * @param {array} args
 * @return {*}
 */
function exec(value, args) {
    return typeof value === 'function' ? value.apply(null, args || []) : value;
}

module.exports.usy = usy;
