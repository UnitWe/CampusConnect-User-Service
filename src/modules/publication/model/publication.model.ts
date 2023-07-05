import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "src/modules/user/model/user.model";

@Table
export class Publication extends Model<Publication> {
    @Column({
        type: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    })
    id: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string

    @Column({
        type: DataType.STRING,
    })
    sub_title: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    body: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    user_id: string;

    @CreatedAt
    createdAt?: any;

    @UpdatedAt
    updatedAt?: any;

    @BelongsTo(() => User, {foreignKey: "user_id", as: "owner"})
    user: User
}