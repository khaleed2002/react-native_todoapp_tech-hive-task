import { body, param, validationResult } from 'express-validator'
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customError.js'
import prisma from '../../prisma/client.js'
import { NextFunction, Request, Response } from 'express'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req: Request, _res: Response, next: NextFunction) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg)
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages.join())
        } else if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError(errorMessages.join())
        }
        throw new BadRequestError(errorMessages.join())
      }
      next()
    },
  ]
}

export const validateUser = withValidationErrors([
  body('name').trim().notEmpty().withMessage('name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('email should be a valid email')
    .custom(async (email) => {
      const user = await prisma.user.findUnique({ where: { email } })
      if (user) {
        throw new BadRequestError('email is already used')
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password length should be 8 character long at least'),
])

export const validateLogin = withValidationErrors([
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
])

export const validateUpdateUser = withValidationErrors([
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('name').trim().notEmpty().withMessage('name is required'),
])
