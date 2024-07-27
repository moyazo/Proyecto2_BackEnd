import {CategoryAttributes} from '../types/models'
import {
  Table,
  Model,
  DataType,
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import ServiceCategory from "./servicecategory";
import ReservaCategory from "./reservacategory";
// TODO: RELATION WITH OTHER MODELS

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

@Table({
  timestamps: true,
  tableName: 'Categories',
  modelName: 'Category',
})

class Category extends Model<CategoryAttributes,CategoryCreationAttributes> {
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
  @CreatedAt
  declare createdAt: Date

  // @ts-ignore
  @UpdatedAt
  declare updatedAt: Date
  // @ts-ignore
  @BelongsToMany(() => Category, () => serviceCategories)
  declare serviceCategories!: ServiceCategory[]
  // @ts-ignore
  @BelongsToMany(() => Reserva, () => reservaCategories)
  declare reservaCategories!: ReservaCategory[]
}


export default Category