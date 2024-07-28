import db from '../models/index'
import {AuthControllerReturn, SignInDataRecieved, SignUpDataRecieved} from "../types/controllers";
// @ts-ignore
import bcrypt from 'bcrypt'
// @ts-ignore
import jsonwebtoken from 'jsonwebtoken'
import {getUserByEmail, getUserById} from './users'
import {v4 as uuidv4} from 'uuid';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'asfagwe234534gs'
const saltRounds = 10

const signUp = async (signData: SignUpDataRecieved): Promise<AuthControllerReturn> => {
    const existedUser = await getUserByEmail(signData.email)
    if (existedUser.data.id) {
        throw new Error('User existed')
    }
    const email = signData.email
    const name = signData.name
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(signData.password, salt)
    const userToCreate = {
        id:  uuidv4(),
        name,
        email,
        password: hashedPassword,
        userName: '',
        salt,
    }
    console.log(db.models)
    const newUser = await db.models.User.create(userToCreate)

    return {
        data: jsonwebtoken.sign({email: newUser.dataValues.email}, TOKEN_SECRET),
        message: "Sign up correcto",
        status: true

    }
}

const signIn = async (signData: SignInDataRecieved): Promise<AuthControllerReturn> => {
    const user = await getUserByEmail(signData.email)
    if (!user) {
        throw new Error('User not found')
    }

    const match = await bcrypt.compare(signData.password, user.data.password)

    if (!match) {
        throw new Error('Wrong password')
    }

    if(typeof user.data !== 'object') {
        return {
            data: 'No hay data',
            message: "Sign in incorrect",
            status: true

        }
    } else {

        return {
            data: jsonwebtoken.sign({ email: user.data }, TOKEN_SECRET),
            message: "Sign in correcto",
            status: true

        }
    }


}

export { signUp, signIn }

