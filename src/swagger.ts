// URL後方加上api-docs = swagger page
import swaggerJsdoc from 'swagger-jsdoc'
import dotenv from 'dotenv'
dotenv.config()
import { loadSecrets } from './helpers/loadSecrets'


if (process.env.NODE_ENV == 'test') {
    loadSecrets()
  }
const port = process.env.PORT || 3000
let url
let description
if (process.env.AWS_URL !== 'test') {
  url = process.env.AWS_URL
  description = 'AWS server'
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
      description: 'API Description',
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
