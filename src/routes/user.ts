import { Router, Request, Response } from 'express'
const router = Router()
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    toggleFollowCompany,
    toggleFavoriteServcice
} from '../controllers/users'

// Get all users
router.get('/', async ( req, res, next ) => {
    try {
       const users = await getUsers();
       if(!users) {
           res.status(403).json('Can not get users')
       }

       res.status(200).json(users)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Get user by id
router.get('/:id', async ( req, res, next ) => {
    try {
       const user = await getUserById(req.params.id);
       if(!user) {
           res.status(403).json('User not found')
       }

       res.status(200).json(user)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Create a new user
router.post('/', async ( req, res, next ) => {
    try {
        if(!req.body) {
            return res.status(403).json('Request body is missing')
        }
       const user = await createUser(req.body);
        if(!user) {
            return res.status(403).json('Can not get User')
        }
       res.status(200).json(user)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Update a user by id
router.put('/:id', async ( req, res, next ) => {
    try {
        if(!req.body) {
            return res.status(403).json('Request body is missing')
        }
       const user = await updateUser(req.params.id, req.body);
        if(!user) {
            return res.status(403).json('Can not update user')
        }
       res.status(200).json(user)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

// Delete a user by id
router.delete('/:id', async ( req, res, next ) => {
    try {
        if(!req.params.id) {
            return res.status(403).json('User id is missing')
        }
       const user = await deleteUser(req.params.id);
        if(!user) {
            return res.status(403).json('Can not delete user')
        }
       res.status(200).json(user)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

router.post('/follow', async ( req, res, next ) => {
    try {
        const { clientID, companyID} = req.body
        if( !clientID || !companyID ){
            return res.status(403).json('clientID and companyID are required')
        }
        const followed = await toggleFollowCompany(clientID,companyID);
        if(!followed) {
            return res.status(403).json('Can not follow company')
        }
        res.status(200).json(followed)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

router.post('/favorites', async ( req, res, next ) => {
    try {
        const { clientID, serviceID} = req.body
        if( !clientID || !serviceID ){
            return res.status(403).json('clientID and serviceID are required')
        }
        const added = await toggleFavoriteServcice(clientID,serviceID);
        if(!added) {
            return res.status(403).json('Can not add favorite')
        }
        res.status(200).json(added)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})


export default router