const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {
    port
} = require('./config');

app.use(express.static('static'))


const router = require('./router')

router(app);

app.listen(port, () => {
    console.log(`Started app on http://localhost:${port}`);
})

