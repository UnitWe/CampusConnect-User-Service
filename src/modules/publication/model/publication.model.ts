import { BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "../../user/model/user.model";
import { Comment } from "../../comment/model/comment.model";

@Table({ freezeTableName: true })
export class Publication extends Model<Publication> {
    @Default(DataType.UUIDV4)
    @PrimaryKey
    @Column({
        type: DataType.UUID,
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
        type: DataType.STRING(8000),
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

    @HasMany(() => Comment, {foreignKey: "publication_id", as: "comments"})
    comment: Comment
}