import { Router } from 'express'
import { login, logout, register } from '../controllers/authController.js'
import {
  validateLogin,
  validateUser,
} from '../middlewares/validationMiddlewares.js'
const router = Router()

router.post('/login', validateLogin, login)
router.get('/logout', logout)
router.post('/register', validateUser, register)

export default router
