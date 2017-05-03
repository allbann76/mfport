'use strict';

const Controller = require('./controller/');

const ROUTES = {
    '/': {
        get: staticController({
            page: 'index'
        }),
        post: staticController({
            page: 'index'
        })
    },
    '/about': {
        get: staticController({
            page: 'about',
        })
    },
};

/**
 * @public
 * @param {express.app} app
  */
function router(app) {
    Object.keys(ROUTES).forEach(route => {
        const methods = Object.keys(ROUTES[route]);

        methods.forEach(method => {
            const controller = ROUTES[route][method];

            app[method](route, function (req, res, next) {
                controller.response(req, res, next);
            });

        });
    });
}

/**
 * @private
 * @param {object} params
 * @return {Controller}
 */
function staticController(params) {
    return new Controller(params)
        .printProp('$$delayed', 0)
        .delay(2000)
        .printProp('$$delayed')
        .update({allahu: 'akbar'})
        .delay(300)
        .printProp('allahu')
        .printProp('$$delayed')
        .send(() => 'Hello');
}

module.exports = router;
