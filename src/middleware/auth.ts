
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import User from '../models/user'
import sequelize from '../models'
const user = sequelize.models.User as typeof User
import { Request, Response, NextFunction } from 'express'
import {getUserByEmail} from "../controllers/users";

const TOKEN_SECRET: string = process.env.TOKEN_SECRET || ''

const ensureAuthentication = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {

    if (request.path.includes('/auth')) {
        return next()
    }
    if (!request.headers.authorization) {
        return response.status(403).json('You are not authenticated')
    }


    const token = request.headers.authorization.split(' ')[1]
    if (!token) {
        return response.status(403).json('Invalid token')
    }

    const payload = jsonwebtoken.decode(token) as JwtPayload | null
    if (!payload || !payload.email) {
        return response.status(403).json('Invalid token')
    }

    const userFound = await getUserByEmail(payload.email.email)
    if (!userFound) {
        return response.status(403).json('Wrong token')
    }

    ;(request as any).user = { id: userFound.data.id, email: userFound.data.email }

    next()
}

export default ensureAuthentication
