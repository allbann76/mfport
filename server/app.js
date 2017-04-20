'use strict';

const express = require('express');
const app = express();
const loger = require('./middlwares/loger.js');


const {
    port,logFile
} = require('./config');


app.use(loger);

app.get('/', (req, res) => {
    res.send('hello');
    console.log('send data at  '+Date.now());
});

app.listen(port, () => {
    console.log(`Started app on http://localhost:${port}`); // eslint-disable-line no-console
});
