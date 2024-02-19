// // URL後方加上api-docs = swagger page
// import swaggerJsdoc from 'swagger-jsdoc'
// import dotenv from 'dotenv'
// dotenv.config()
// import { loadSecrets } from './helpers/loadSecrets'


// const port = process.env.PORT || 3000
// const localUrl = `http://localhost:${port}`
// const awsUrl = process.env.AWS_URL

// const options = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'TravelCompare API',
//       version: '1.0.0',
//       description: 'API Description',
//     },
//     servers: [
//       {
//         url: localUrl,
//         description: 'Local server',
//       },
//       {
//         url: awsUrl,
//         description: 'AWS EC2 server',
//       },
//     ],
//   },
//   apis: ['./src/routes/**/*.ts'],
// };

// const swaggerSpec = swaggerJsdoc(options);

// export default swaggerSpec;

// 在您的应用入口文件中，比如 app.js 或者 index.js

import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { loadSecrets } from './helpers/loadSecrets';
import swaggerJsdoc from 'swagger-jsdoc';
import routes from './routes'; // 假设您的路由配置在这里

dotenv.config();

async function initializeApp() {
  await loadSecrets(); // 确保在进行任何配置之前加载秘密

  const port = process.env.PORT || 3000;
  const localUrl = `http://localhost:${port}`;
  const awsUrl = process.env.AWS_URL;

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

  const app = express();

  // 设置 Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // 设置您的路由
  app.use(routes);

  // 其他中间件和路由配置...

  app.listen(port, () => {
    console.log(`Express server is running on PORT:${port}`);
  });
}

initializeApp().catch(error => {
  console.error('Failed to initialize the app:', error);
});
