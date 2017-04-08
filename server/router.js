'use strict';

const {resolve} = require('path');

const ROUTES = {
    '/': [
        {
            method: 'get',
            controller: staticController,
            page: 'index'
        },
        {
            method: 'post',
            controller: staticControllerPost,
            page: 'index'  
        }
    ],
    '/about': [
        {
            method: 'get',
            controller: staticController,
            page: 'about'
        }
    ]
}

function router(app) {
    Object.keys(ROUTES).forEach(route => {
        const methods = ROUTES[route];

        methods.forEach(params => {

            /**
             *  params = {
                    method: <string>,
                    controller: <function>,
                    page: <string>
                }
             */
            app[params.method](route, function (req, res, next) {
                req.page = params.page;
                params.controller(req, res, next);
            });

        });
    });
}

function staticController(req, res, next) {
    res.sendFile(resolve(`./static/${req.page}.html`));
}

function staticControllerPost(req, res, next){
    res.send('POsds')
}

module.exports = router;