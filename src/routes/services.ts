import { Router, Request, Response } from 'express'
const router = Router()
import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} from '../controllers/services'


// Get all services
router.get('/', async ( req, res, next ) => {
    try {
        const services = await getServices();
        if(!services.data) {
            res.status(403).json('Can not get services')
        }

        res.status(200).json(services)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Get user by id
router.get('/:id', async ( req, res, next ) => {
    try {
        const service = await getServiceById(req.params.id);
        if(!service.data) {
            res.status(403).json('service not found')
        }

        res.status(200).json(service)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Create a new service
router.post('/', async ( req, res, next ) => {
    try {
        if(!req.body) {
            return res.status(403).json('Request body is missing')
        }
        const service = await createService(req.body);
        if(!service.data) {
            return res.status(403).json('Can not get service')
        }
        res.status(200).json(service)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Update a service by id
router.put('/:id', async ( req, res, next ) => {
    try {
        if(!req.body) {
            return res.status(403).json('Request body is missing')
        }
        const service = await updateService(req.params.id, req.body);
        if(!service.data) {
            return res.status(403).json('Can not update service')
        }
        res.status(200).json(service)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Delete a service by id
router.delete('/:id', async ( req, res, next ) => {
    try {
        if(!req.params.id) {
            return res.status(403).json('service id is missing')
        }
        const service = await deleteService(req.params.id);
        if(!service.data) {
            return res.status(403).json('Can not delete service')
        }
        res.status(200).json(service)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

export default router