import { Response } from 'express'
import prisma from '../../prisma/client.js'
import { NotFoundError } from '../errors/customErrors.js'
import { StatusCodes } from 'http-status-codes'
import { RequestWithUserInfo } from '../types.js'

export const getAllTasks = async (req: RequestWithUserInfo, res: Response) => {
    const { completed } = req.query;

    const tasks = await prisma.task.findMany({
        where: {
            userId: req.user.id,
            ...(completed && { completed: Boolean(completed) })
        },
    })
    if (!tasks) {
        throw new NotFoundError('no tasks found')
    }
    res.status(StatusCodes.OK).json(tasks)
}

export const createTask = async (req: RequestWithUserInfo, res: Response) => {
    let { description, completed: completedField } = req.body
    let completed: boolean;
    if (typeof completedField === 'string') {
        completed = completedField === 'true' ? true : false;
    } else {
        completed = completedField
    }

    const task = await prisma.task.create({
        data: {
            description,
            completed: completed || false,
            userId: req.user.id,
        },
    })
    res.status(StatusCodes.CREATED).json(task)
}

export const getSingleTask = async (
    req: RequestWithUserInfo,
    res: Response
) => {
    const task = await prisma.task.findUnique({ where: { id: req.params.id } })
    if (!task) {
        throw new NotFoundError(`no task with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json(task)
}

export const editTask = async (req: RequestWithUserInfo, res: Response) => {
    const { description, completed } = req.body

    const task = await prisma.task.update({
        where: {
            id: req.params.id,
        },
        data: {
            description,
            completed: Boolean(completed),
        },
    })

    if (!task) {
        throw new NotFoundError(`no task with id: ${req.params.id}`)
    }
    res
        .status(StatusCodes.OK)
        .json({ message: 'task updated successfully!', task })
}

export const deleteTask = async (req: RequestWithUserInfo, res: Response) => {
    const deletedTask = await prisma.task.delete({
        where: {
            id: req.params.id
        }
    })
    if (!deletedTask) {
        throw new NotFoundError(`no task with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({ message: 'task deleted successfully!', task: deletedTask })
}

export const deleteAllTasks = async (req: RequestWithUserInfo, res: Response) => {
    await prisma.task.deleteMany({
        where: {
            userId: req.user.id
        }
    })
    res.status(StatusCodes.OK).json({ message: 'all tasks have been deleted!' })
}
