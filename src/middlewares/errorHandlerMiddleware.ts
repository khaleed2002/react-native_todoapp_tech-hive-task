import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (
  err,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const message = err.message || 'server error, try again later'
  console.log(err.message)
  if (!err.statusCode) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'server error, try again later' })
  }
  res.status(statusCode).json({ message })
}

export default errorHandlerMiddleware
