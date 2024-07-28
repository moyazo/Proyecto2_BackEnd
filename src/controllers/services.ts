import db from '../models/index'
import {ServiceControllerReturn, ServiceControllerReturnArray, ServiceControllerReturnDeleted} from "../types/controllers";
import {ServiceType} from "../types/models";


const getServices = async (): Promise<ServiceControllerReturnArray> => {
    const serviceToReturn = {
        id: '',
        name: '',
        description: '',
        available: '',
        categoryID: '',
        companyID: '',
    }
    let controllerReturn: ServiceControllerReturnArray = {
        data: [serviceToReturn], message: "", status: false

    }
    const services = await db.models.Service.findAll()

    if(!services) {

        controllerReturn.message = 'No se encontraron servicios'
    } else {
        const parseServices: ServiceType[] = services.map(service => service.dataValues)
        controllerReturn.status = true
        controllerReturn.data = parseServices
        controllerReturn.message = 'Servicios encontrados'
    }

    return controllerReturn
}

const getServiceById = async (serviceId: string): Promise<ServiceControllerReturn> => {
    const serviceToReturn = {
        id: '',
        name: '',
        description: '',
        available: '',
        categoryID: '',
        companyID: '',
    }
    let controllerReturn: ServiceControllerReturn = {
        data: serviceToReturn, message: "", status: false

    }

    if(!serviceId) {
        controllerReturn.message = 'ID de categoría no válido'
    } else {
        const service = await db.models.Service.findByPk(serviceId)

        if(!service) {
            controllerReturn.message = 'No se encontró un servicio con ese ID'
        } else {
            serviceToReturn.id = service.dataValues.id
            serviceToReturn.name = service.dataValues.name
            serviceToReturn.description = service.dataValues.description
            serviceToReturn.available = service.dataValues.available
            serviceToReturn.categoryID = service.dataValues.categoryID
            serviceToReturn.companyID = service.dataValues.companyID

            controllerReturn.status = true
            controllerReturn.data = serviceToReturn
            controllerReturn.message = 'Servicio encontrado'
        }
    }

    return controllerReturn
}

const createService = async (service: ServiceType): Promise<ServiceControllerReturn> => {
    const serviceToReturn = {
        id: '',
        name: '',
        description: '',
        available: '',
        categoryID: '',
        companyID: '',
    }
    let controllerReturn: ServiceControllerReturn = {
        data: serviceToReturn, message: "", status: false

    }

    let dataNotundefined = false
    for (const key in service) {
        if(key != undefined || key != '') {
            break
        }
    }
    if(dataNotundefined) {
        controllerReturn.message = 'Todos los campos son obligatorios'
        return controllerReturn
    } else {
        const serviceExists = await db.models.Service.findOne({where: {name: service.name}})
        if(serviceExists) {
            controllerReturn.message = 'Ya existe un Servicio con ese name'
        } else {
            console.log({service})
            const newService = await db.models.Service.create({
            name: service.name,
            description: service.description,
            available: service.available,
            categoryID: service.categoryID,
            companyID: service.companyID,
         })

            if(!newService) {
                controllerReturn.message = 'No se pudo crear el Servicio'
            } else{
                const service = await getServiceById( newService.dataValues.id)
                serviceToReturn.id = service.data.id
                serviceToReturn.name = service.data.name
                serviceToReturn.id = service.data.id
                serviceToReturn.name = service.data.name
                serviceToReturn.description = service.data.description
                serviceToReturn.available = service.data.available
                serviceToReturn.categoryID = service.data.categoryID
                serviceToReturn.companyID = service.data.companyID

                controllerReturn.status = true
                controllerReturn.data = serviceToReturn
                controllerReturn.message = 'ervicio creado correctamente'
            }
        }
    }

    return controllerReturn
}

const updateService = async (serviceId: string, service: ServiceType): Promise<ServiceControllerReturn> => {
    const serviceToReturn = {
        id: '',
        name: '',
        description: '',
        available: '',
        categoryID: '',
        companyID: '',
    }
    let controllerReturn: ServiceControllerReturn = {
        data: serviceToReturn, message: "", status: false

    }

    if(!serviceId) {
        controllerReturn.message = 'ID de servicio no válido'
    } else {
        const updatedService = await db.models.Service.update(service, {where: {id: serviceId}})

        if(updatedService[0] === 0) {
            controllerReturn.message = 'No se encontró una categoría con ese ID'
        } else {
            const service = await getServiceById(serviceId)
            serviceToReturn.id = service.data.id
            serviceToReturn.name = service.data.name
            serviceToReturn.id = service.data.id
            serviceToReturn.name = service.data.name
            serviceToReturn.description = service.data.description
            serviceToReturn.available = service.data.available
            serviceToReturn.categoryID = service.data.categoryID
            serviceToReturn.companyID = service.data.companyID

            controllerReturn.status = true
            controllerReturn.data = serviceToReturn
            controllerReturn.message = 'Servicio actualizado correctamente'
        }
    }

    return controllerReturn
}

const deleteService = async (serviceId: string): Promise<ServiceControllerReturnDeleted> => {
    let controllerReturn: ServiceControllerReturnDeleted= {
        status: false,
        data: 0,
        message: ''
    }

    if(!serviceId) {
        controllerReturn.message = 'ID de servicio no válido'
    } else {
        const deletedService = await db.models.Service.destroy({where: {id: serviceId}})

        if(deletedService === 0) {
            controllerReturn.message = 'No se encontró un servicio con ese ID'
        } else {
            controllerReturn.status = true
            controllerReturn.data = 1
            controllerReturn.message = 'Servicio eliminado correctamente'
        }
    }

    return controllerReturn
}

export {getServices, getServiceById, createService, updateService, deleteService}