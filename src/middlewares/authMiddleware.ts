import { NextFunction, Request, Response } from 'express'
import { UnauthenticatedError } from '../errors/customError.js'
import { verifyJWT } from '../utils/jwt.js'

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies
  if (!token) throw new UnauthenticatedError('invalid authentication')
  try {
    const { id } = verifyJWT(token) as { id: string }
    req['user'] = { id }
    next()
  } catch (err) {
    throw new UnauthenticatedError('invalid authentication')
  }
}

export default authMiddleware
