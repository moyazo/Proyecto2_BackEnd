import { ServiceCategoryAttributes } from '../types/models'
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsToMany, ForeignKey, BelongsTo,
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import Category from './category'
import Reserva from './reserva'
import Service from './service'
import User from "./user";
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

  @Column({
    allowNull: false,
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare id: string


  @ForeignKey(() => Category)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare categoryID: string

  @ForeignKey(() => Service)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare serviceID: string

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date


  @BelongsTo(() => Service)
  service!: Service

  @BelongsTo(() => Category)
  category!: Category
}

export default ServiceCategory
