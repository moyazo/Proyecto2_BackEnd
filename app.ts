// @ts-ignore
import express, { Express } from 'express'
// @ts-ignore
import bodyParser from 'body-parser'
// @ts-ignore
import dotenv from 'dotenv'
import db from './src/models/index'

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

  try {
    // @ts-ignore
    db.sequelize.beforeSync({ force: false })
    app.listen(port, () => {
      console.log('APP running on port ' + port)
    })
  } catch (error: any) {
    console.log('Error at start up the App' + error)
    process.exit(1)
  }
}

startApp()
