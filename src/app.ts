import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from './config/passport'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger'
import { initializeDatabase } from './db/models/index'
import routes from './routes'
import flash from 'connect-flash'
import { loadSecrets } from './helpers/loadSecrets'

async function startApp() {
  const app = express()
  const port = process.env.PORT || 3000
  
  if ( process.env.NODE_ENV == 'production' ) {
    await loadSecrets()
  }

  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.use(cors())

  app.use(session({
  secret: process.env.SESSION_SECRET!,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(flash())

  await initializeDatabase()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!')
  })

  app.use(routes)

  app.listen(port, () => {
    console.log(`Express server is running on PORT:${port}`)
  })
}

startApp().catch((error) => {
  console.error("Failed to start the server:", error)
})
