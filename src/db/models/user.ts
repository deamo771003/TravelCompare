import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Favorite } from './favorite';
import { Star } from './star';
import { Comment } from './comment';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  admin!: boolean;

  @HasMany(() => Favorite)
  favorites!: Favorite[]

  @HasMany(() => Star)
  star!: Star[]

  @HasMany(() => Comment)
  comment!: Comment[]
}
