import { UserAttributes } from '../types/models'
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany, CreatedAt, UpdatedAt, BelongsTo, HasMany,
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import Service from './service'
import Userservicesfavorites from "./userservicesfavorites";
import ClientFollowedCompany from "./clientfollowedcompany";
import Reserva from "./reserva";


export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'Users',
  modelName: 'User',
})
class User extends Model<UserAttributes, UserCreationAttributes> {
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
  declare email: string


  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string


  @Column({
    type: DataType.STRING,
  })
  declare userName: string


  @Column({
    type: DataType.STRING,
  })
  declare salt: string


  @CreatedAt
  declare createdAt: Date


  @UpdatedAt
  declare updatedAt: Date


  @BelongsToMany(() => Service, () => Userservicesfavorites)
  userFavService!: Service[]


  @BelongsToMany(() => User, () => ClientFollowedCompany)
  clientCompanyFollowed!: User[]

  @HasMany(() => Service)
  userServices!: Service[]

  @HasMany(() => Reserva)
  userReservas!: Reserva[]
}

export default User
