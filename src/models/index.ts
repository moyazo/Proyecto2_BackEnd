'use strict'

import fs = require('fs')
import path = require('path')
import { Sequelize, DataType } from 'sequelize-typescript'
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../../config/config.json')[env]
const db = {
  sequelize: Sequelize,
  Sequelize,
}

const sequelize = new Sequelize({
  database: config.database || process.env.POSTGRES_DB,
  dialect: config.dialect || process.env.DIALECT,
  username: config.username || process.env.POSTGRES_USER,
  password: config.password || process.env.POSTGRES_PASSWORD,
  host: config.host || process.env.HOST,
})

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataType)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// @ts-ignore
db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
