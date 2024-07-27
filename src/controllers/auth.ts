import db from '../models/index'
import {UserControllerReturn} from "../types/controllers";
import {UserType} from "../types/models";
// @ts-ignore
import bcrypt from 'bcrypt'
// @ts-ignore
import jsonwebtoken from 'jsonwebtoken'
import {getUserByEmail} from './users'
import { v4 as uuidv4 } from 'uuid';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'asfagwe234534gs'
const saltRounds = 10

const signup = async (signData) => {
    const existedUser = await getUserByEmail(signData.email)
    if (existedUser) {
        throw new Error('User existed')
    }
    const email = signData.email
    const name = signData.name
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(signData.password, salt)

    const newUser = await db.models.User.create({
        id:  uuidv4(),
        email,
        password: hashedPassword,
        name,
        userName: '',
        salt,
    })

    return jsonwebtoken.sign({ email: newUser.dataValues.email }, TOKEN_SECRET)
}

const login = async (signData) => {
    const user = await getUserByEmail(signData.email)

    if (!user) {
        throw new Error('User not found')
    }

    const match = await bcrypt.compare(signData.password, user.data)

    if (!match) {
        throw new Error('Wrong password')
    }
    user
    return jsonwebtoken.sign({ email: user.email }, TOKEN_SECRET)
}

const auth = { signup, login }

export default auth