import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user'
import { Itinerary } from './itinerary'

@Table
export class Comment extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  message!: string;

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
