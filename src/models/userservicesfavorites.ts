import { UserServicesFavoritesAttributes } from '../types/models'
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsToMany, ForeignKey,
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import Service from './service'
import User from "./user";
// TODO: RELATION WITH OTHER MODELS

interface UserServicesFavoritesCreationAttributes
  extends Optional<UserServicesFavoritesAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'UserServicesFavorites',
  modelName: 'UserServiceFavorite',
})
export class UserServiceFavorite extends Model<
  UserServicesFavoritesAttributes,
  UserServicesFavoritesCreationAttributes
> {

  @Column({
    allowNull: false,
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare id: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    references: {
      model: 'User',
      key: 'id',
    },
    allowNull: false,
  })
  declare clientID: string


  @ForeignKey(() => Service)
  @Column({
    type: DataType.UUID,
    references: {
      model: 'Service',
      key: 'id',
    },
    allowNull: false,
  })
  declare serviceID: string

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date
}

export default UserServiceFavorite
