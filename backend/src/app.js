const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cors = require('cors')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
// parse application/json
app.use(bodyParser.json());

app.use('/api', routes);

module.exports = app;
