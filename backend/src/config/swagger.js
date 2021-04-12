const swaggerJSDoc = require('swagger-jsdoc');

// require the app url and port configuration
const { appName, url, port, } = require('./serverConfig');

const swaggerDefinition = {
  info: {
    title: `${appName} API Docs`, // Title of the documentation
    version: '1.0.0', // Version of the app
    description: `This is the REST API for ${appName} ..... a ride sharing app`, // short description of the app
  },
  host: `localhost:${port}`, // the host or url of the app
  basePath: '/api', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./src/docs/*.yaml'],
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options); 