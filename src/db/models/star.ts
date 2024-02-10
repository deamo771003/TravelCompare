import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user';
import { Itinerary } from './itinerary'

@Table
export class Star extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  count!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User

  @ForeignKey(() => Itinerary)
  @Column
  itineraryId!: number;

  @BelongsTo(() => Itinerary)
  itinerary!: Itinerary
}
