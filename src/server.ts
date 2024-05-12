import 'express-async-errors'
import express from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import prisma from '../prisma/client.js'
import { StatusCodes } from 'http-status-codes'
// routes
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
import taskRouter from './routes/taskRouter.js'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'
import authMiddleware from './middlewares/authMiddleware.js'
dotenv.config()

const app = express()

//middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', authMiddleware, userRouter)
app.use('/api/v1/tasks', authMiddleware, taskRouter)

app.get('/', (_req, res) => {
  res.send('basic server...')
})

// Not Found Middleware
app.use('*', (_req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

app.use(errorHandlerMiddleware)

// server listening
const port = parseInt(process.env.PORT as string) || 3001

try {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
