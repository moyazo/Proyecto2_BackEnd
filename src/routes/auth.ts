import { Router, Request, Response } from 'express'
const router = Router()
import {
    signUp,
    signIn
} from '../controllers/auth'

router.post('/sign-up', async ( req: Request, res: Response ) => {
    try {
        const { email, password, name } = req.body
        if (!email || !password || !name) {
            res.status(403).json('Email or Password or Name not found')
        }
        const user = await signUp(req.body);
        if(!user) {
            return res.status(403).json('Can not get User')
        }
        res.status(200).json(user)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

router.post('/sign-in', async ( req: Request, res: Response ) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(403).json('Email or Password not found')
        }
        const user = await signIn(req.body);
        if(!user) {
            return res.status(403).json('Can not get User')
        }
        res.status(200).json(user)
    } catch ( e: any ) {
        res.status(500).json(e.message)
    }
})

export default router