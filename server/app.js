const express = require('express');

const app = express()

const {
    port
} = require('./config');

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(port, () => {
    console.log(`Started app on http://localhost:${port}`);
})

