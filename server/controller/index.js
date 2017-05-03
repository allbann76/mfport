'use strict';

const {resolve} = require('path');

/**
 * @private
 * @return {object}
 */
function pipe() {
    let fns = [];
    let i = 0;

    const api = {
        add: fn => (fns.push(fn), api),
        call: value => {
            return !fns[i]
                ? value
                : fns[i](value, () => {
                    i += 1;
                    return api.call(value);
                });
        }
    };

    return api;
}

/**
 * @private
 * @param {string} method
 * @return {function}
 */
function alias(method) {
    return function () {
        return Controller.prototype[method].apply(Controller.prototype, arguments);
    };
}

/**
 * @public
 * @constructor Controller
 */
function Controller({page}) {
    this.page = page;
    this.pipe = pipe();
}

/**
 * @public
 * @param {number} time
 * @return {Controller}
 */
Controller.prototype.delay = function (time) {
    return this.apply(function ({req}, next) {
        req.$$delayed = req.$$delayed || 0;
        req.$$delayed += time;

        setTimeout(next, time);
    });
};

/**
 * @public
 * @return {Controller}
 */
Controller.prototype.render = function () {
    const {page} = this;
    const url = resolve(`./static/${page}.html`);

    return this.apply(({res}) => res.sendFile(url));
};

/**
 * @public
 * @param {function} fn
 * @return {Controller}
 */
Controller.prototype.call = function (fn) {
    const _self = this;
    return this.apply(({req, res}, next) => {
        fn.call(_self, req, res, next);
    });
};

Controller.prototype.then = alias('call');

/**
 * @public
 * @param {function} fn
 * @return {Controller}
 */
Controller.prototype.send = function (fn) {
    return this.apply(({req, res}) => {
        res.send(fn(req, res));
    });
};

/**
 * @public
 * @param {function|object} fn
 * @return {Controller}
 */
Controller.prototype.update = function (fn) {
    return this.apply(({req, res}, next) => {
        const data = typeof fn === 'function' ? fn(req, res) : fn;
        next(Object.assign(req, data));
    });
};

/**
 * @public
 * @param {string} prop
 * @param {*} def
 * @return {Controller}
 */
Controller.prototype.printProp = function (prop, def) {
    return this.apply(({req}, next) => {
        /* eslint-disable */
        console.log(prop, req[prop] || def);
        /* eslint-enable */
        next();
    });
};

/**
 * @public
 * @param {function} middleware
 * @return {Controller}
 */
Controller.prototype.apply = function (middleware) {
    this.pipe.add(middleware);
    return this;
};

/**
 * @public
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @return {Controller}
 */
Controller.prototype.response = function (req, res, next) {
    this.pipe.call({req, res, next});
    return this;
};

module.exports = Controller;
