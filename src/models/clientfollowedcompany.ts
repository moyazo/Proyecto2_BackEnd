import { ClientFollowedCompanyAttributes } from '../types/models'
import {Table, Model, DataType, ForeignKey, Column, CreatedAt, UpdatedAt, BelongsTo} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import User from './user'
// TODO: RELATION WITH OTHER MODELS

interface ClientFollowedCompanyCreationAttributes
  extends Optional<ClientFollowedCompanyAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'ClientFollowedCompanies',
  modelName: 'ClientFollowedCompany',
})
class ClientFollowedCompany extends Model<
  ClientFollowedCompanyAttributes,
  ClientFollowedCompanyCreationAttributes
> {
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

  @CreatedAt
  declare createdAt: Date


  @UpdatedAt
  declare updatedAt: Date

  @BelongsTo(() => User,'clientID')
  client!: User

  @BelongsTo(() => User,'companyID')
  company!: User
}

export default ClientFollowedCompany
