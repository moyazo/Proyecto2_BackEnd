import { ClientFollowedCompanyAttributes } from '../types/models'
import { Table, Model, DataType } from 'sequelize-typescript'
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
  declare clientID: string

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
  declare companyID: string
  // @ts-ignore
  @CreatedAt
  declare createdAt: Date

  // @ts-ignore
  @UpdatedAt
  declare updatedAt: Date
}

export default ClientFollowedCompany
