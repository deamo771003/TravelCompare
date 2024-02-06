// 部署GCP
// CI/CD
// kubernetes
let url: string
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  url = 'http://localhost:'
} else {
  url = 'https://travelcompare-412314.de.r.appspot.com/'
}
import express, { Request, Response } from 'express'
import { initializeDatabase } from './db/models/index'
import routes from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger'
import cors from 'cors'
// import { getConfig } from './config/config'


const app = express()
const port = process.env.PORT || 3000

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(cors())

initializeDatabase()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

app.use(routes)

app.listen(port, () => {
  console.log(`express sever is running on ${url}${port}`)
});

// (async () => {
//     const config = await getConfig();
//     console.log(config);
// })();