// @ts-ignore
import express, { Express } from 'express'
// @ts-ignore
import bodyParser from 'body-parser'
// @ts-ignore
import dotenv from 'dotenv'
import db from './src/models/index'
import authRoutes from './src/routes/auth'
import userRoutes from './src/routes/user'
import categoriesRoutes from './src/routes/categories'
import servicesRoutes from './src/routes/services'
import reservasRoutes from './src/routes/reservas'
import ensureAuthentication from './src/middleware/auth'

const startApp = async () => {
  const app: Express = express()
  dotenv.config()
  const port: string = process.env.port || '8000'

  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(ensureAuthentication)
  app.use('/auth', authRoutes)
  app.use('/users', userRoutes)
  app.use('/categories', categoriesRoutes)
  app.use('/services', servicesRoutes)
  app.use('/reservas', reservasRoutes)


  try {
    // @ts-ignore
    await db.sync()
    app.listen(port, () => {
      console.log('APP running on port ' + port)
    })
  } catch (error: any) {
    console.log('Error at start up the App' + error)
    process.exit(1)
  }
}

startApp()
