import { ReservaAttributes } from '../types/models'
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
  HasMany, ForeignKey, BelongsTo,
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import User from './user'
import Category from './category'
import Service from "./service";
import ServiceCategory from "./servicecategory";
import ReservaCategory from "./reservacategory";
// TODO: RELATION WITH OTHER MODELS

interface ReservaCreationAttributes extends Optional<ReservaAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'Reservas',
  modelName: 'Reserva',
})
class Reserva extends Model<ReservaAttributes, ReservaCreationAttributes> {

  @Column({
    allowNull: false,
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare id: string

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

  @BelongsTo(() => Service,'serviceID')
  service!: Service

  @BelongsTo(() => User,'clientID')
  client!: User

  @BelongsToMany(() => Category, () => ServiceCategory, 'categoryID','categoryID')
  categoriesService!: Category[]

  @BelongsToMany(() => Category, () => ReservaCategory, 'reservaID','categoryID')
  categoriesReserva!: Category[]

}

export default Reserva
