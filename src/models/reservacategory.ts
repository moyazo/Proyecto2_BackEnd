import { ReservaCategoryAttributes } from '../types/models'
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
// TODO: RELATION WITH OTHER MODELS

interface ReservaCategoryCreationAttributes
  extends Optional<ReservaCategoryAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'Categories',
  modelName: 'Category',
})
class ReservaCategory extends Model<
  ReservaCategoryAttributes,
  ReservaCategoryCreationAttributes
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
  @ForeignKey(() => Reserva)
  @Column({
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    references: {
      model: 'Reserva',
      key: 'id',
    },
  })
  declare reservaID!: string

  // @ts-ignore
  @CreatedAt
  declare createdAt: Date

  // @ts-ignore
  @UpdatedAt
  declare updatedAt: Date

  /*@BelongsToMany(() => Character, () => UserFavoritesCharacter)
  userFavChar!: Character[]*/
}

export default ReservaCategory
