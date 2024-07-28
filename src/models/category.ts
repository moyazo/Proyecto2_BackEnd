import { CategoryAttributes } from '../types/models'
import {Table, Model, DataType, Column, CreatedAt, UpdatedAt, BelongsToMany} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import ServiceCategory from './servicecategory'
import ReservaCategory from './reservacategory'
import Reserva from "./reserva";
import Service from "./service";


interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'Categories',
  modelName: 'Category',
})
class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
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


  @CreatedAt
  declare createdAt: Date


  @UpdatedAt
  declare updatedAt: Date

  @BelongsToMany(() => Service, () => ServiceCategory,'categoryID','serviceID')
  services!: Service[]

  @BelongsToMany(() => Reserva, () => ReservaCategory,'categoryID','reservaID')
  reservas!: Reserva[]
}

export default Category
