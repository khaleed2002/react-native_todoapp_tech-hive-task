interface IUser {
    email: string
    name: string
    password: string
}

interface IAuthenticatedUser {
    email: string
    name: string
}

export interface IIcon {
    name: string
    id: string
    symbol: string
}


interface ICategoryRequest {
    name: string
    color: IColor
    icon: IIcon
}

interface ITask {
    id: string
    description
    completed: boolean
    userId: string
    createdAt: string
    updatedAt: string
}

interface ITaskRequest {
    description: string
    completed: boolean
}