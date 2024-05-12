import { Router } from 'express'

const route = Router()
// get all tasks
route.get('/', () => {})
// create a task
route.post('/', () => {})
// edit a task
route.patch('/:id', () => {})
// delete a task
route.delete('/:id', () => {})

export default route
