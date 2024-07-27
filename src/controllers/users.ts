import db from '../models/index'
import {UserControllerReturn} from "../types/controllers";
import {UserType} from "../types/models";


const getUserByEmail = async (email: string): Promise<UserControllerReturn> => {
    let controllerReturn: UserControllerReturn = {
        data: undefined, message: "", status: false

    }
    if(!email) {
        controllerReturn.status = false
        controllerReturn.data = undefined
        controllerReturn.message = 'Email no válido'
    } else {
        const user = await db.models.User.findOne({where: {email}})

        if(!user) {
            controllerReturn.status = false
            controllerReturn.data = undefined
            controllerReturn.message = 'No se encontró un usuario con ese email'
        } else {

            controllerReturn.status = true
            controllerReturn.data = user.dataValues
            controllerReturn.message = 'Usuario encontrado'
        }
    }

    return controllerReturn
}


const getUsers = async (): Promise<UserControllerReturn> => {
    let controllerReturn: UserControllerReturn = {
        data: undefined, message: "", status: false

    }

    const users = await db.models.User.findAll()
    if(!users) {
        controllerReturn.status = false
        controllerReturn.data = undefined
        controllerReturn.message = 'No se encontraron usuarios'
    } else {
        const parseUsers = users.map(user => user.dataValues)
        controllerReturn.status = true
        controllerReturn.data = parseUsers
        controllerReturn.message = 'Usuarios encontrados'
    }

    return controllerReturn
}

const getUserById = async (userId: string): Promise<UserControllerReturn> => {
    let controllerReturn: UserControllerReturn= {
        status: false,
        data: undefined,
        message: ''
    }

    if(!userId) {
        controllerReturn.status = false
        controllerReturn.data = undefined
        controllerReturn.message = 'ID de usuario no válido'
    } else {
        const user = await db.models.User.findByPk(userId)

        if(!user) {
            controllerReturn.status = false
            controllerReturn.data = undefined
            controllerReturn.message = 'No se encontró un usuario con ese ID'
        } else {
            controllerReturn.status = true
            controllerReturn.data = user.dataValues
            controllerReturn.message = 'Usuario encontrado'
        }
    }

    return controllerReturn
}

const createUser = async (user: UserType): Promise<UserControllerReturn> => {
    let controllerReturn: UserControllerReturn= {
        status: false,
        data: undefined,
        message: ''
    }

    let dataNotundefined = false
    for (const key in user) {
        if(key != undefined || key != '') {
            break
        }
    }
    if(dataNotundefined) {
        controllerReturn.status = false
        controllerReturn.data = undefined
        controllerReturn.message = 'Todos los campos son obligatorios'
        return controllerReturn
    } else {
        const userExists = await db.models.User.findOne({where: {email: user.email}})
        if(userExists) {
            controllerReturn.status = false
            controllerReturn.data = undefined
            controllerReturn.message = 'Ya existe un usuario con ese email'
        } else {
            const newUser = await db.models.User.create({user})
            if(!newUser) {
                controllerReturn.status = false
                controllerReturn.data = undefined
                controllerReturn.message = 'No se pudo crear el usuario'
            } else {
                controllerReturn.status = true
                controllerReturn.data = newUser.dataValues
                controllerReturn.message = 'Usuario creado correctamente'
            }
        }
    }

    return controllerReturn
}

const updateUser = async (userId: string, user: UserType): Promise<UserControllerReturn> => {
    let controllerReturn: UserControllerReturn= {
        status: false,
        data: undefined,
        message: ''
    }

    if(!userId) {
        controllerReturn.status = false
        controllerReturn.data = undefined
        controllerReturn.message = 'ID de usuario no válido'
    } else {
        const updatedUser = await db.models.User.update(user, {where: {id: userId}})

        if(updatedUser[0] === 0) {
            controllerReturn.status = false
            controllerReturn.data = undefined
            controllerReturn.message = 'No se encontró un usuario con ese ID'
        } else {
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                userName: user.userName,
                salt: user.salt,
            }
            controllerReturn.status = true
            controllerReturn.data = userData
            controllerReturn.message = 'Usuario actualizado correctamente'
        }
    }

    return controllerReturn
}

const deleteUser = async (userId: string): Promise<UserControllerReturn> => {
    let controllerReturn: UserControllerReturn= {
        status: false,
        data: undefined,
        message: ''
    }

    if(!userId) {
        controllerReturn.status = false
        controllerReturn.data = undefined
        controllerReturn.message = 'ID de usuario no válido'
    } else {
        const deletedUser = await db.models.User.destroy({where: {id: userId}})

        if(deletedUser === 0) {
            controllerReturn.status = false
            controllerReturn.data = undefined
            controllerReturn.message = 'No se encontró un usuario con ese ID'
        } else {
            controllerReturn.status = true
            controllerReturn.data = 1
            controllerReturn.message = 'Usuario eliminado correctamente'
        }
    }

    return controllerReturn
}

export {getUserByEmail, getUsers, getUserById, createUser, updateUser, deleteUser}