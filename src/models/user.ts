import { UserAttributes } from '../types/models'
import {
  Table,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import Service from './service'
import UserServiceFavorite from './userservicesfavorites'
import ClientFollowedCompany from './clientfollowedcompany'

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'Users',
  modelName: 'User',
})
class User extends Model<UserAttributes, UserCreationAttributes> {
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
  declare email: string

  // @ts-ignore
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string

  // @ts-ignore
  @Column({
    type: DataType.STRING,
  })
  declare userName: string

  // @ts-ignore
  @Column({
    type: DataType.STRING,
  })
  declare salt: string

  // @ts-ignore
  @CreatedAt
  declare createdAt: Date

  // @ts-ignore
  @UpdatedAt
  declare updatedAt: Date

  // @ts-ignore
  @BelongsToMany(() => Service, () => userFavService)
  declare userFavService!: Service[]

  // @ts-ignore
  @BelongsToMany(() => User, () => clientCompanyFollowed)
  declare clientCompanyFollowed!: User[]
}

export default User
