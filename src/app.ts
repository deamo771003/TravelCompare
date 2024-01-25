// MSSQL
// 製作API
// 部署GCP
// postman
// swagger
// CI/CD
// kubernetes
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
import express, { Request, Response } from 'express'
import { initializeDatabase } from './db/models/index'
import routes from './routes'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

const app = express()
const port = process.env.PORT || 3000

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

initializeDatabase()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

app.use(routes)

app.listen(port, () => {
  console.log(`express sever is running on http://localhost:${port}`)
})