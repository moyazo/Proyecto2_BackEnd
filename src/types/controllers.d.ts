import {UserType} from "./models";

interface UserControllerReturn {
    status: boolean,
    data?: UserType | UserType[] | undefined | number,
    message?: string
}