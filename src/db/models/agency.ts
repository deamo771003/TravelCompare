import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Itinerary } from './itinerary'

@Table
export class Agency extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @HasMany(() => Itinerary)
  itinerary!: Itinerary[]
}