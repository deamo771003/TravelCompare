// URL後方加上api-docs = swagger page
import swaggerJsdoc from 'swagger-jsdoc';
const port = process.env.PORT || 3000
const url = process.env.AWS_URL || `http://localhost:${port}`

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'TravelCompare API',
      version: '1.0.0',
      description: 'API Description',
    },
    servers: [
      {
        url: url,
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
