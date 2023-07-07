import { HasMany, Column, CreatedAt, DataType, Model, Table, UpdatedAt, PrimaryKey, Default } from "sequelize-typescript";
import { Publication } from "../../publication/model/publication.model";

@Table({ freezeTableName: true })
export class User extends Model<User> {

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

    @HasMany(() => Publication, { foreignKey: "user_id" })
    publication: Publication
}