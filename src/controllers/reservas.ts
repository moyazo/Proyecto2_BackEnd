import db from '../models/index'
import {ReservaControllerReturn, ReservaControllerReturnArray, ReservaControllerReturnDeleted} from "../types/controllers";
import {ReservaType} from "../types/models";
import reserva from "../models/reserva";


const getReservas = async (clientID: string): Promise<ReservaControllerReturnArray> => {
    const reservaToReturn = {
        id: '',
        serviceID: '',
        clientID: '',
        categoryID: '',
    }
    let controllerReturn: ReservaControllerReturnArray = {
        data: [reservaToReturn], message: "", status: false

    }
    const reservas = await db.models.Reserva.findAll({
        where:{
            clientID
        }
    })

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

const getReservaById = async (reservaId: string,clientID: string): Promise<ReservaControllerReturn> => {
    const reservaToReturn = {
        id: '',
        serviceID: '',
        clientID: '',
        categoryID: '',
    }
    let controllerReturn: ReservaControllerReturn = {
        data: reservaToReturn, message: "", status: false

    }

    if(!reservaId) {
        controllerReturn.message = 'ID de reserva no válido'
    } else {
        const reserva = await db.models.Reserva.findOne({
            where:{
                id: reservaId,
                clientID
            }
        })

        if(!reserva) {
            controllerReturn.message = 'No se encontró una reserva con ese ID'
        } else {
            reservaToReturn.id = reserva.dataValues.id
            reservaToReturn.categoryID = reserva.dataValues.categoryID
            reservaToReturn.clientID = reserva.dataValues.clientID
            reservaToReturn.serviceID = reserva.dataValues.serviceID

            controllerReturn.status = true
            controllerReturn.data = reservaToReturn
            controllerReturn.message = 'Reserva encontrada'
        }
    }

    return controllerReturn
}

const toggleReserva = async (reserva: ReservaType): Promise<ReservaControllerReturn> => {
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
    }
    else {
        const reservaExists = await db.models.Reserva.findOne({
            where: {
                clientID: reserva.clientID,
                serviceID: reserva.serviceID,
                categoryID: reserva.categoryID
            }
        })
        if(reservaExists) {
            await deleteReserva(reservaExists.dataValues.id);
            controllerReturn.message = 'La reserva ha sido cancelada'
            controllerReturn.status = true
        }
        else {
            const newReserva = await db.models.Reserva.create({
                clientID: reserva.clientID,
                categoryID: reserva.categoryID,
                serviceID: reserva.serviceID,
            })

            if(!newReserva) {
                controllerReturn.message = 'No se pudo crear el Servicio'
            }
            else{
                const reserva = await getReservaById( newReserva.dataValues.id, newReserva.dataValues.clientID)
                reservaToReturn.id = reserva.data.id
                reservaToReturn.clientID =  reserva.data.clientID
                reservaToReturn.categoryID = reserva.data.categoryID
                reservaToReturn.serviceID = reserva.data.serviceID

                controllerReturn.status = true
                controllerReturn.data = reservaToReturn
                controllerReturn.message = 'El servicio ha sido reservado correctamente'
            }
        }
    }

    return controllerReturn
}

const updateReserva = async (reserva: ReservaType): Promise<ReservaControllerReturn> => {
    const reservaToReturn = {
        id: '',
        serviceID: '',
        clientID: '',
        categoryID: '',
    }
    let controllerReturn: ReservaControllerReturn = {
        data: reservaToReturn, message: "", status: false

    }

    if(!reserva.id) {
        controllerReturn.message = 'ID de reserva no es válido'
    } else {
        const updatedReserva = await db.models.Reserva.update(reserva, {
            where: {
                id: reserva.id,
                clientID: reserva.clientID,
            }
        })

        if(updatedReserva[0] === 0) {
            controllerReturn.message = 'No se encontró una Reserva con ese ID'
        } else {
            const reservaByID = await getReservaById(reserva.id,reserva.clientID)
            reservaToReturn.id = reservaByID.data.id
            reservaToReturn.categoryID = reservaByID.data.categoryID
            reservaToReturn.clientID = reservaByID.data.clientID
            reservaToReturn.serviceID = reservaByID.data.serviceID


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
        const deletedReserva = await db.models.Reserva.destroy({
            where: {
                id: reservaId
            }
        })

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

export {getReservas, getReservaById, toggleReserva, updateReserva, deleteReserva}