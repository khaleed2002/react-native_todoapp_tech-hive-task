import { Router } from 'express'
import { login, logout, register } from '../controllers/authController.js'
import {
  validateLogin,
  validateUser,
} from '../middlewares/validationMiddlewares.js'
const route = Router()

route.post('/login', validateLogin, login)
route.get('/logout', logout)
route.post('/register', validateUser, register)

export default route
