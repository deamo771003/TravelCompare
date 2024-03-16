// URL後方加上api-docs = swagger page
import swaggerJsdoc from 'swagger-jsdoc'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000
let url
let description
if (process.env.NODE_ENV !== 'development') {
  url = 'https://www.travelcompare.store'
  description = 'AWS_server'
} else {
  url = `http://localhost:${port}`
  description = 'Local server'
}

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'TravelCompare API',
      version: '1.0.0',
      description: `Domain: ${url}`,
    },
    servers: [
      {
        url: url,
        description: description,
      }
    ],
  },
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
