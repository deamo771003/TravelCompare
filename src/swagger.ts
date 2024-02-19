// URL後方加上api-docs = swagger page
import swaggerJsdoc from 'swagger-jsdoc'
import dotenv from 'dotenv'
dotenv.config()
import { loadSecrets } from './helpers/loadSecrets'

loadSecrets()
const port = process.env.PORT || 3000
const localUrl = `http://localhost:${port}`
const awsUrl = process.env.AWS_URL

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
        url: localUrl,
        description: 'Local server',
      },
      {
        url: awsUrl,
        description: 'AWS EC2 server',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
