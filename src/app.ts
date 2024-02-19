import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
// import { loadSecrets } from './helpers/loadSecrets';
import { initializeDatabase } from './db/models/index';
import routes from './routes';

async function startApp() {
  // // 首先加载秘密
  // await loadSecrets();
  // console.log(`AWS_DB_HOST=${process.env.AWS_DB_HOST}`);
  // console.log(`AWS_URL=${process.env.AWS_URL}`);

  const app = express();
  const port = process.env.PORT || 3000;

  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(cors());

  // 初始化数据库
  await initializeDatabase();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
  });

  app.use(routes);

  app.listen(port, () => {
    console.log(`Express server is running on PORT:${port}`);
  });
}

startApp().catch((error) => {
  console.error("Failed to start the server:", error);
});
