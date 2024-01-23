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
import { initializeDatabase } from './db/initializeDatabase'

const app = express()
const port = process.env.PORT || 3000

initializeDatabase()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})
app.listen(port, () => {
  console.log(`express sever is running on http://localhost:${port}`)
})