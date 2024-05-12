import express from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import { StatusCodes } from 'http-status-codes'
import '../prisma/client.js'
dotenv.config()

const app = express()
//middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('basic server...')
})

app.use('*', (_req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({ error: 'Error 404, Not Found' })
})

const port = parseInt(process.env.PORT as string) || 3001
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
