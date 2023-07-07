import {
  DataType,
  Table,
  Model,
  Column,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { Publication } from '../../publication/model/publication.model';
import { User } from '../../user/model/user.model';

@Table({ freezeTableName: true })
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  body: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @ForeignKey(() => Publication)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  publication_id: string;

  @CreatedAt
  createdAt?: any;

  @UpdatedAt
  updatedAt?: any;

  @BelongsTo(() => User, {foreignKey: "user_id", as: "owner"})
  user: User

  @BelongsTo(() => Publication, {foreignKey: "publication_id"})
  publication: Publication
}
