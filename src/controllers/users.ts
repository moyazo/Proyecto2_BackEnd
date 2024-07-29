import db from '../models/index'
import {UserControllerReturn, UserControllerReturnArray, UserControllerReturnDeleted} from "../types/controllers";
import {UserType} from "../types/models";


const getUserByEmail = async (email: string): Promise<UserControllerReturn> => {
    const userToReturn = {
        id: '',
        name: '',
        email: '',
        password: '',
        userName: '',
        salt: '',
    }
    let controllerReturn: UserControllerReturn = {
        data: userToReturn, message: "", status: false

    }
    if(!email) {
        controllerReturn.message = 'Email no válido'
    } else {
        const user = await db.models.User.findOne({where: {email}})

        if(!user) {
            controllerReturn.message = 'No se encontró un usuario con ese email'
        } else {
            userToReturn.id = user.dataValues.id
            userToReturn.name = user.dataValues.name
            userToReturn.email = user.dataValues.email
            userToReturn.password = user.dataValues.password
            userToReturn.userName = user.dataValues.userName
            userToReturn.salt = user.dataValues.salt

            controllerReturn.status = true
            controllerReturn.data = userToReturn
            controllerReturn.message = 'Usuario encontrado'
        }
    }

    return controllerReturn
}

const getUsers = async (): Promise<UserControllerReturnArray> => {
    const userToReturn = {
        id: '',
        name: '',
        email: '',
        password: '',
        userName: '',
        salt: '',
    }
    let controllerReturn: UserControllerReturnArray = {
        data: [userToReturn], message: "", status: false

    }

    const users = await db.models.User.findAll()
    if(!users) {

        controllerReturn.message = 'No se encontraron usuarios'
    } else {
        const parseUsers: UserType[] = users.map(user => user.dataValues)
        controllerReturn.status = true
        controllerReturn.data = parseUsers
        controllerReturn.message = 'Usuarios encontrados'
    }

    return controllerReturn
}

const getUserById = async (userId: string): Promise<UserControllerReturn> => {
    const userToReturn = {
        id: '',
        name: '',
        email: '',
        password: '',
        userName: '',
        salt: '',
    }
    let controllerReturn: UserControllerReturn = {
        data: userToReturn, message: "", status: false

    }

    if(!userId) {
        controllerReturn.message = 'ID de usuario no válido'
    } else {
        const user = await db.models.User.findByPk(userId)

        if(!user) {
            controllerReturn.message = 'No se encontró un usuario con ese ID'
        } else {
            userToReturn.id = user.dataValues.id
            userToReturn.name = user.dataValues.name
            userToReturn.email = user.dataValues.email
            userToReturn.password = user.dataValues.password
            userToReturn.userName = user.dataValues.userName
            userToReturn.salt = user.dataValues.salt

            controllerReturn.status = true
            controllerReturn.data = userToReturn
            controllerReturn.message = 'Usuario encontrado'
        }
    }

    return controllerReturn
}

const createUser = async (user: UserType): Promise<UserControllerReturn> => {
    const userToReturn = {
        id: '',
        name: '',
        email: '',
        password: '',
        userName: '',
        salt: '',
    }
    let controllerReturn: UserControllerReturn = {
        data: userToReturn, message: "", status: false

    }

    let dataNotundefined = false
    for (const key in user) {
        if(key != undefined || key != '') {
            break
        }
    }
    if(dataNotundefined) {
        controllerReturn.message = 'Todos los campos son obligatorios'
        return controllerReturn
    } else {
        const userExists = await db.models.User.findOne({where: {email: user.email}})
        if(userExists) {
            controllerReturn.message = 'Ya existe un usuario con ese email'
        } else {
            const newUser = await db.models.User.create({user})
            if(!newUser) {
                controllerReturn.message = 'No se pudo crear el usuario'
            } else{
                const user = await getUserById( newUser.dataValues.id)
                userToReturn.id = user.data.id
                userToReturn.name = user.data.name
                userToReturn.email = user.data.email
                userToReturn.password = user.data.password
                userToReturn.userName = user.data.userName
                userToReturn.salt = user.data.salt

                controllerReturn.status = true
                controllerReturn.data = userToReturn
                controllerReturn.message = 'Usuario creado correctamente'
            }
        }
    }

    return controllerReturn
}

const updateUser = async (userId: string, user: UserType): Promise<UserControllerReturn> => {
    const userToReturn = {
        id: '',
        name: '',
        email: '',
        password: '',
        userName: '',
        salt: '',
    }
    let controllerReturn: UserControllerReturn = {
        data: userToReturn, message: "", status: false

    }

    if(!userId) {
        controllerReturn.message = 'ID de usuario no válido'
    } else {
        const updatedUser = await db.models.User.update(user, {where: {id: userId}})

        if(updatedUser[0] === 0) {
            controllerReturn.message = 'No se encontró un usuario con ese ID'
        } else {
            const user = await getUserById(userId)
            userToReturn.id = user.data.id
            userToReturn.name = user.data.name
            userToReturn.email = user.data.email
            userToReturn.password = user.data.password
            userToReturn.userName = user.data.userName
            userToReturn.salt = user.data.salt

            controllerReturn.status = true
            controllerReturn.data = userToReturn
            controllerReturn.message = 'Usuario actualizado correctamente'
        }
    }

    return controllerReturn
}

const deleteUser = async (userId: string): Promise<UserControllerReturnDeleted> => {
    let controllerReturn: UserControllerReturnDeleted= {
        status: false,
        data: 0,
        message: ''
    }

    if(!userId) {
        controllerReturn.message = 'ID de usuario no válido'
    } else {
        const deletedUser = await db.models.User.destroy({where: {id: userId}})

        if(deletedUser === 0) {
            controllerReturn.message = 'No se encontró un usuario con ese ID'
        } else {
            controllerReturn.status = true
            controllerReturn.data = 1
            controllerReturn.message = 'Usuario eliminado correctamente'
        }
    }

    return controllerReturn
}

const toggleFollowCompany = async (clientdID: string, companyID: string) => {
    const client = await getUserById(clientdID)
    const company = await getUserById(companyID)

    if(!company || !client) {
        return {status: false, message: 'No se encontró el usuario'}
    }

    const followed = await db.models.ClientFollowedCompany.findOne(
        {
            where: {
                clientID: client.data.id,
                companyID: company.data.id
            }
        }
    )
    if(followed) {
        const unfollow = await db.models.ClientFollowedCompany.destroy({
            where:{
                clientID: client.data.id,
                companyID: company.data.id
            }
        })
        return {status: false, message: 'El usuario dejó de seguir a la empresa'}
    } else {
        const newFollow = await db.models.ClientFollowedCompany.create({clientID: client.data.id, companyID: company.data.id})
        if (!newFollow) {
            return {status: false, message: 'No se pudo seguir a la empresa'}
        } else {
            return {status: true, message: 'Se siguió a la empresa correctamente'}
        }
    }
}

export {getUserByEmail, getUsers, getUserById, createUser, updateUser, deleteUser,toggleFollowCompany}