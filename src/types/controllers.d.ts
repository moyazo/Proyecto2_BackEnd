import {CategoryType, ServiceType, UserType,ReservaType} from "./models";


interface UserControllerReturn {
    status: boolean,
    data: UserType,
    message?: string
}
interface UserControllerReturnArray {
    status: boolean,
    data: UserType[],
    message?: string
}
interface UserControllerReturnDeleted {
    status: boolean,
    data: number,
    message?: string
}

interface CategoryControllerReturn {
    status: boolean,
    data: CategoryType,
    message?: string
}
interface CategoryControllerReturnArray {
    status: boolean,
    data: CategoryType[],
    message?: string
}
interface CategoryControllerReturnDeleted {
    status: boolean,
    data: number,
    message?: string
}

interface ServiceControllerReturn {
    status: boolean,
    data: ServiceType,
    message?: string
}
interface ServiceControllerReturnArray {
    status: boolean,
    data: ServiceType[],
    message?: string
}
interface ServiceControllerReturnDeleted {
    status: boolean,
    data: number,
    message?: string
}

interface ReservaControllerReturn {
    status: boolean,
    data: ReservaType,
    message?: string
}
interface ReservaControllerReturnArray {
    status: boolean,
    data: ReservaType[],
    message?: string
}
interface ReservaControllerReturnDeleted {
    status: boolean,
    data: number,
    message?: string
}

interface SignUpDataRecieved {
    email: string,
    password: string,
    name: string
}

interface SignInDataRecieved {
    email: string,
    password: string,
    name: string
}

interface AuthControllerReturn {
    status: boolean,
    data?: string,
    message?: string
}