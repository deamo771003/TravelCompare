import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})
app.listen(port, () => {
  console.log(`express sever is running on http://localhost:${port}`)
})