import {
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ freezeTableName: true })
export class University extends Model<University> {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  active: boolean;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  abbreviation: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cnpj: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}
