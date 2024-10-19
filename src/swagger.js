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
                    For more information, visit the [official documentation](https://rapidapi.com/anesu21/api/zesapushinfo).',
      contact: {
        name: 'Anesu Ndava',
        email: 'anesu@rodent.co.zw',
        url: 'https://rodent.vercel.app',
      },
      license: {
        name: 'MIT License',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'https://www.shedsense.co.zw/api',
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
