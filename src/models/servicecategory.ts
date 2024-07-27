import { ServiceCategoryAttributes } from '../types/models'
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
import Category from './category'
import Reserva from './reserva'
import Service from './service'
// TODO: RELATION WITH OTHER MODELS

interface ServiceCategoryCreationAttributes
  extends Optional<ServiceCategoryAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'Categories',
  modelName: 'Category',
})
class ServiceCategory extends Model<
  ServiceCategoryAttributes,
  ServiceCategoryCreationAttributes
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
  @ForeignKey(() => Category)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    references: {
      model: 'Category',
      key: 'id',
    },
  })
  declare categoryID!: string

  // @ts-ignore
  @ForeignKey(() => Service)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    references: {
      model: 'Service',
      key: 'id',
    },
  })
  declare serviceID!: string

  // @ts-ignore
  @CreatedAt
  declare createdAt: Date

  // @ts-ignore
  @UpdatedAt
  declare updatedAt: Date
}

export default ServiceCategory
