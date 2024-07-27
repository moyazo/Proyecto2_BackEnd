import { ServiceAttributes } from '../types/models'
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import User from './user'
import UserServiceFavorite from "./userservicesfavorites";

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'Services',
  modelName: 'Service',
})
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> {
  // @ts-ignore
  @Column({
    allowNull: false,
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare id: string

  // @ts-ignore
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare name: string

  // @ts-ignore
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string

  // @ts-ignore
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare available: string

  // @ts-ignore
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    references: {
      model: 'User',
      key: 'id',
    },
    allowNull: false,
  })
  // @ts-ignore
  @HasMany(() => User, companyID)
  declare companyID: string

  // @ts-ignore
  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    references: {
      model: 'Category',
      key: 'id',
    },
    allowNull: false,
  })
  // @ts-ignore
  @HasMany(() => Category, categoryID)
  declare categoryID: string

  // @ts-ignore
  @CreatedAt
  declare createdAt: Date

  // @ts-ignore
  @UpdatedAt
  declare updatedAt: Date

  //@ts-ignore
  @BelongsToMany(() => User, () => ServiceFavUser)
  declare ServiceFavUser!: UserServiceFavorite[]
}

export default Service
