import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Favorite, Star, Comment, Origin, Country, Agency } from './index';

@Table
export class Itinerary extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  endDate!: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  cost!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  details!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  image!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  formed!: boolean;

  @HasMany(() => Favorite)
  favorites!: Favorite[]

  @HasMany(() => Star)
  star!: Star[]

  @HasMany(() => Comment)
  comment!: Comment[]

  @ForeignKey(() => Origin)
  @Column
  originId!: number;

  @BelongsTo(() => Origin)
  origin!: Origin

  @ForeignKey(() => Country)
  @Column
  countryId!: number;

  @BelongsTo(() => Country)
  country!: Country

  @ForeignKey(() => Agency)
  @Column
  agencyId!: number;

  @BelongsTo(() => Agency)
  agency!: Agency
}
