import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from "sequelize-typescript";

@Table({ freezeTableName: true })
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
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
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}