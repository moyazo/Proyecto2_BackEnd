'use strict'

// @ts-ignore
import path from 'path'
import { Sequelize, DataType } from 'sequelize-typescript'
import Category from "./category";
import ClientFollowedCompany from "./clientfollowedcompany";
import Reserva from "./reserva";
import ReservaCategory from "./reservacategory";
import Service from "./service";
import User from "./user";
import UserServiceFavorite from "./userservicesfavorites";
import ServiceCategory from "./servicecategory";
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../../config/config.json')[env]


const sequelize = new Sequelize({
  database: config.database || process.env.POSTGRES_DB,
  dialect: config.dialect || process.env.DIALECT,
  username: config.username || process.env.POSTGRES_USER,
  password: config.password || process.env.POSTGRES_PASSWORD,
  host: config.host || process.env.HOST,
})

sequelize.addModels([
  Category,
    ClientFollowedCompany,
    Reserva,
    ReservaCategory,
    Service,
    ServiceCategory,
    User,
    UserServiceFavorite

])

export default sequelize
