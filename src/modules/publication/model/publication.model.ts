import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "../../user/model/user.model";

@Table({ freezeTableName: true })
export class Publication extends Model<Publication> {
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
        type: DataType.UUID,
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