// swagger.js

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Service Directory API',
      version: '1.0.0.2024EC',
      description: 'The Service Directory API provides access to various services and businesses. Authentication required. \
                    For more information, visit the [official documentation](http://yourdocumentationlink.com).',
      contact: {
        name: 'Anesu Ndava',
        email: 'ndabaprinco@gmail.com',
        url: 'https://rodent-zimbabwe.github.io/app',
      },
      license: {
        name: 'MIT License',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:8800/api',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // paths to files with API definitions
};



const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs,
};
