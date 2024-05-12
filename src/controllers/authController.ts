import { StatusCodes } from 'http-status-codes'
import { comparePasswords, hashPassword } from '../utils/password.js'
import prisma from '../../prisma/client.js'
import { Request, Response } from 'express'
import { UnauthenticatedError } from '../errors/customError.js'
import { createJWT } from '../utils/jwt.js'

export const register = async (req: Request, res: Response) => {
  const { password, email, name } = req.body
  const hashedPassword = await hashPassword(password)
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })
  res.status(StatusCodes.CREATED).json({ message: 'user has been created' })
}

export const login = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  })
  if (!user) throw new UnauthenticatedError('invalid email or password')

  const isCorrectPassword = await comparePasswords(
    req.body.password,
    user.password
  )
  if (!isCorrectPassword) {
    throw new UnauthenticatedError('invalid email or password')
  }
  const token = createJWT({ id: user.id })
  const oneWeek = 1000 * 60 * 60 * 24 * 7
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneWeek),
    secure: process.env.NODE_ENV === 'production',
  })
  res.status(StatusCodes.OK).json({ message: 'user logged in successfully' })
}

export const logout = async (_req: Request, res: Response) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ message: 'user logged out successfully' })
}
