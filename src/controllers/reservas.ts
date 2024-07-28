import db from '../models/index'
import {ReservaControllerReturn, ReservaControllerReturnArray, ReservaControllerReturnDeleted} from "../types/controllers";
import {ReservaType} from "../types/models";


const getReservas = async (): Promise<ReservaControllerReturnArray> => {
    const reservaToReturn = {
        id: '',
        name: '',
        description: '',
        available: '',
        categoryID: '',
        companyID: '',
    }
    let controllerReturn: ReservaControllerReturnArray = {
        data: [reservaToReturn], message: "", status: false

    }
    const reservas = await db.models.Reserva.findAll()

    if(!reservas) {

        controllerReturn.message = 'No se encontraron reservas'
    } else {
        const parseReservas: ReservaType[] = reservas.map(reserva=> reserva.dataValues)
        controllerReturn.status = true
        controllerReturn.data = parseReservas
        controllerReturn.message = 'Reservas encontradas'
    }

    return controllerReturn
}

const getReservaById = async (reservaId: string): Promise<ReservaControllerReturn> => {
    const reservaToReturn = {
        id: '',
        name: '',
        description: '',
        available: '',
        categoryID: '',
        companyID: '',
    }
    let controllerReturn: ReservaControllerReturn = {
        data: reservaToReturn, message: "", status: false

    }

    if(!reservaId) {
        controllerReturn.message = 'ID de reserva no válido'
    } else {
        const reserva = await db.models.Reserva.findByPk(reservaId)

        if(!reserva) {
            controllerReturn.message = 'No se encontró una reserva con ese ID'
        } else {
            reservaToReturn.id = reserva.dataValues.id
            reservaToReturn.name = reserva.dataValues.name
            reservaToReturn .description = reserva.dataValues.description
            reservaToReturn.available = reserva.dataValues.available
            reservaToReturn.categoryID = reserva.dataValues.categoryID
            reservaToReturn.companyID = reserva.dataValues.companyID

            controllerReturn.status = true
            controllerReturn.data = reservaToReturn
            controllerReturn.message = 'Reserva encontrada'
        }
    }

    return controllerReturn
}

const createReserva = async (reserva: ReservaType): Promise<ReservaControllerReturn> => {
    const reservaToReturn = {
        id: '',
        serviceID: '',
        clientID: '',
        categoryID: '',
    }
    let controllerReturn: ReservaControllerReturn = {
        data: reservaToReturn, message: "", status: false

    }

    let dataNotundefined = false
    for (const key in reserva) {
        if(key != undefined || key != '') {
            break
        }
    }
    if(dataNotundefined) {
        controllerReturn.message = 'Todos los campos son obligatorios'
        return controllerReturn
    } else {
        const reservaExists = await db.models.Reserva.findOne({where: {name: reserva.name}})
        if(reservaExists) {
            controllerReturn.message = 'Ya existe una reserva con ese name'
        } else {
            const newReserva = await db.models.Reserva.create({
                clientID: reserva.clientID,
                categoryID: reserva.categoryID,
                serviceID: reserva.serviceID,
            })

            if(!newReserva) {
                controllerReturn.message = 'No se pudo crear el Servicio'
            } else{
                const reserva = await getReservaById( newReserva.dataValues.id)
                reservaToReturn.id = reserva.data.id
                reservaToReturn.clientID =  reserva.data.clientID
                reservaToReturn.categoryID = reserva.data.categoryID
                reservaToReturn.serviceID = reserva.data.serviceID

                controllerReturn.status = true
                controllerReturn.data = reservaToReturn
                controllerReturn.message = 'Reserva creada correctamente'
            }
        }
    }

    return controllerReturn
}

const updateReserva = async (reservaId: string, reserva: ReservaType): Promise<ReservaControllerReturn> => {
    const reservaToReturn = {
        id: '',
        name: '',
        description: '',
        available: '',
        categoryID: '',
        companyID: '',
    }
    let controllerReturn: ReservaControllerReturn = {
        data: reservaToReturn, message: "", status: false

    }

    if(!reservaId) {
        controllerReturn.message = 'ID de reserva no es válido'
    } else {
        const updatedReserva = await db.models.Reserva.update(reserva, {where: {id: reservaId}})

        if(updatedReserva[0] === 0) {
            controllerReturn.message = 'No se encontró una Reserva con ese ID'
        } else {
            const reserva = await getReservaById(reservaId)
            reservaToReturn.id = reserva.data.id
            reservaToReturn.name = reserva.data.name
            reservaToReturn.id = reserva.data.id
            reservaToReturn.name = reserva.data.name
            reservaToReturn.description = reserva.data.description
            reservaToReturn.available = reserva.data.available
            reservaToReturn.categoryID = reserva.data.categoryID
            reservaToReturn.companyID = reserva.data.companyID

            controllerReturn.status = true
            controllerReturn.data = reservaToReturn
            controllerReturn.message = 'Reserva actualizada correctamente'
        }
    }

    return controllerReturn
}

const deleteReserva = async (reservaId: string): Promise<ReservaControllerReturnDeleted> => {
    let controllerReturn: ReservaControllerReturnDeleted= {
        status: false,
        data: 0,
        message: ''
    }

    if(!reservaId) {
        controllerReturn.message = 'ID de reserva no válido'
    } else {
        const deletedReserva = await db.models.Reserva.destroy({where: {id: reservaId}})

        if(deletedReserva === 0) {
            controllerReturn.message = 'No se encontró una reserva con ese ID'
        } else {
            controllerReturn.status = true
            controllerReturn.data = 1
            controllerReturn.message = 'Reserva eliminada correctamente'
        }
    }

    return controllerReturn
}

export {getReservas, getReservaById, createReserva, updateReserva, deleteReserva}