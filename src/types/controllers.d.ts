import {UserType} from "./models";

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