import { StatusCodes } from 'http-status-codes'
import prisma from '../../prisma/client.js'
import { Request, Response } from 'express'
import { RequestWithUserInfo } from '../types.js'

export const getCurrentUser = async (
  req: RequestWithUserInfo,
  res: Response
) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } })
  delete user.password
  const userWithoutPassword = user
  res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}

export const updateCurrentUser = async (
  req: RequestWithUserInfo,
  res: Response
) => {
  let newUser = req.body
  if ('id' in req.body) {
    delete newUser['id']
    delete newUser['password']
  }
  // check if there is a user use the email
  const currentUser = await prisma.user.findUnique({
    where: { id: req.user.id },
  })
  const user = await prisma.user.findUnique({
    where: {
      email: newUser['email'],
      NOT: {
        email: currentUser.email,
      },
    },
  })
  if (user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'email is already used!' })
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: newUser,
  })
  delete updatedUser.password
  const userWithoutPassword = updatedUser
  res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}
