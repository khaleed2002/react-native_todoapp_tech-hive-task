import { ITask, IUser } from "@/types";
import { customRequest } from "./config";

type RegisterUserTypes = IUser
export const registerUser = async ({ email, name, password }: RegisterUserTypes) => {
    try {
        const response = await customRequest.post('/auth/register', { email, name, password })
        return response.data
    } catch (error) {
        console.log("error in register user", error)
        throw error
    }
}



type LoginUserTypes = { email: string, password: string }
export const loginUser = async ({ email, password }: LoginUserTypes) => {
    try {
        const response = await customRequest.post('/auth/login', { email, password })
        return response.data
    } catch (error) {
        console.log("error in login user", error)
        throw error
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await customRequest.get('/users/me')
        return response.data?.user
    } catch (error) {
        console.log("error in getCurrentUser", error)
        throw error
    }
}

export const getAllTasks = async () => {
    try {
        const response = await customRequest.get('/tasks')
        return response.data
    } catch (error) {
        console.log("error in getAllTasks", error)
        throw error
    }
}

type SingleTaskTypes = { id: string }
export const getSingleTask = async ({ id }: SingleTaskTypes) => {
    try {
        const response = await customRequest.get(`/tasks/${id}`)
        return response.data
    } catch (error) {
        console.log("error in getSingleTask", error)
        throw error
    }
}
export const editSingleTask = async ({ id, description, completed }: ITask) => {
    try {
        const response = await customRequest.patch(`/tasks/${id}`, { description, completed })
        return response.data
    } catch (error) {
        console.log("error in editSingleTask", error)
        throw error
    }
}
export const createTask = async ({ id, description, completed }: ITask) => {
    try {
        const response = await customRequest.post(`/tasks`, { id, description, completed })
        return response.data
    } catch (error) {
        console.log("error in createTask", error)
        throw error
    }
}
export const deleteSingleTask = async ({ id }: SingleTaskTypes) => {
    try {
        const response = await customRequest.delete(`/tasks/${id}`)
        return response.data
    } catch (error) {
        console.log("error in DeleteSingleTask", error)
        throw error
    }
}