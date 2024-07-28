import { ServiceAttributes } from '../types/models'
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsToMany, ForeignKey, HasMany, BelongsTo,
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import User from './user'
import UserServiceFavorite from "./userservicesfavorites";
import Category from "./category";
import ServiceCategory from "./servicecategory";
import Userservicesfavorites from "./userservicesfavorites";
import Reserva from "./reserva";

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'Services',
  modelName: 'Service',
})
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {

  @Column({
    allowNull: false,
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare id: string


  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare name: string


  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string


  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare available: string


  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    references: {
      model: 'User',
      key: 'id',
    },
    allowNull: false,
  })
  declare companyID: string



  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    references: {
      model: 'Category',
      key: 'id',
    },
    allowNull: false,
  })
  declare categoryID: string


  @CreatedAt
  declare createdAt: Date


  @UpdatedAt
  declare updatedAt: Date

  @HasMany(() => Reserva)
  reservas!: Reserva

  @BelongsTo(() => User)
  user!: User

  @BelongsToMany(() => User, () => Userservicesfavorites)
  serviceFavUser!: Service[]

  @BelongsToMany(() => Category, () => ServiceCategory)
  serviceCategories!: Category[];

}

export default Service
