'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const loger = require('./middlwares/loger.js');
const router = require('./router');

const app = express();

const {
    port
} = require('./config');

app.use(bodyParser());
app.use(express.static('static'));
app.use(loger);

router(app);

app.listen(port, () => {
    console.log(`Started app on http://localhost:${port}`); // eslint-disable-line no-console
});
