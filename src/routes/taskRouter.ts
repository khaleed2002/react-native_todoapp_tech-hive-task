import { Router } from 'express'
import { createTask, deleteAllTasks, deleteTask, editTask, getAllTasks, getSingleTask } from '../controllers/taskController.js'
import { validateTaskIdAndOwnership, validateTaskInput } from '../middlewares/validationMiddlewares.js'

const route = Router()

route.get('/', getAllTasks)
route.post('/', validateTaskInput, createTask)
route.get('/:id', validateTaskIdAndOwnership, getSingleTask)
route.patch('/:id', validateTaskIdAndOwnership, validateTaskInput, editTask)
route.delete('/:id', validateTaskIdAndOwnership, deleteTask)
route.delete('/', deleteAllTasks)
export default route
