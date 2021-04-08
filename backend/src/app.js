const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger')
const cors = require('cors')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

// use swagger-Ui-express for your app documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes for the end-points
app.use('/api', routes);

module.exports = app;
