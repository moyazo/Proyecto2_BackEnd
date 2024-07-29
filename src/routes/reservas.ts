import { Router, Request, Response } from 'express'
const router = Router()
import {
    getReservas,
    getReservaById,
    toggleReserva,
    updateReserva,
    deleteReserva,
} from '../controllers/reservas'


// Get all reservas
router.get('/', async ( req, res, next ) => {
    try {
        const clientID = req.body.clientID
        if(!clientID) {
            return res.status(403).json('clientID is missing')
        }
        const reservas = await getReservas(clientID);
        if(!reservas.data) {
            res.status(403).json('Can not get reservas')
        }

        res.status(200).json(reservas)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Get user by id
router.get('/:id', async ( req, res, next ) => {
    try {
        const clientID = req.body.clientID
        if(!clientID) {
            return res.status(403).json('clientID is missing')
        }
        const reserva = await getReservaById(req.params.id,clientID);
        if(!reserva.data) {
            res.status(403).json('reserva not found')
        }

        res.status(200).json(reserva)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Create a new Reserva
router.post('/', async ( req, res, next ) => {
    try {
        if(!req.body) {
            return res.status(403).json('Request body is missing')
        }
        const reserva = await toggleReserva(req.body);
        if(!reserva.data) {
            return res.status(403).json('Can not get reserva')
        }
        res.status(200).json(reserva)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Update a Reserva by id
router.put('/:id', async ( req, res, next ) => {
    try {
        if(!req.body) {
            return res.status(403).json('Request body is missing')
        }
        const reserva = await updateReserva(req.body);
        if(!reserva.data) {
            return res.status(403).json('Can not update reserva')
        }
        res.status(200).json(reserva)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Delete a Reserva by id
router.delete('/:id', async ( req, res, next ) => {
    try {
        if(!req.params.id) {
            return res.status(403).json('reserva id is missing')
        }
        const reserva = await deleteReserva(req.params.id);
        if(!reserva.data) {
            return res.status(403).json('Can not delete reserva')
        }
        res.status(200).json(reserva)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

export default router