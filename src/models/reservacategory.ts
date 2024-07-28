import { ReservaCategoryAttributes } from '../types/models'
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
import User from "./user";
// TODO: RELATION WITH OTHER MODELS

interface ReservaCategoryCreationAttributes
  extends Optional<ReservaCategoryAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'ReservaCategories',
  modelName: 'ReservaCategory',
})
class ReservaCategory extends Model<
  ReservaCategoryAttributes,
  ReservaCategoryCreationAttributes
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

  @ForeignKey(() => Reserva)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare reservaID: string

  @CreatedAt
  declare createdAt: Date

  @UpdatedAt
  declare updatedAt: Date

  @BelongsTo(() => Category)
  category!: Category

  @BelongsTo(() => Reserva)
  reserva!: Reserva
}

export default ReservaCategory
