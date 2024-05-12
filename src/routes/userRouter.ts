import { Router } from 'express'
import {
  getCurrentUser,
  updateCurrentUser,
} from '../controllers/userController.js'
import { validateUpdateUser } from '../middlewares/validationMiddlewares.js'

const route = Router()

route.get('/me', getCurrentUser)
route.patch('/me', validateUpdateUser, updateCurrentUser)

export default route
