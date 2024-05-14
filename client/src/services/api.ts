import { IUser } from "@/types";
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