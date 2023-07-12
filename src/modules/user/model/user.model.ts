import { HasMany, Column, CreatedAt, DataType, Model, Table, UpdatedAt, PrimaryKey, Default, BelongsTo, ForeignKey } from "sequelize-typescript";
import { University } from "../../../modules/university/model/university.model";

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
    })
    name: string;

    @Column({
        type: DataType.STRING(2000),
    })
    biograph: string;

    @Column({
        type: DataType.STRING,
    })
    graduation_course: string;

    @Column({
        type: DataType.ENUM,
        values: ['Graduando', 'Graduado', 'Mestre', 'Doutor', 'Ph.d']
    })
    academic_level: string;

    @Column({
        type: DataType.INTEGER,
    })
    year_conclusion: number;

    @Column({
        type : DataType.STRING,
    })
    link: string;

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

    @Column({
        type: DataType.UUID
    })
    picture_bucket_id: string;

    @ForeignKey(() => University)
    @Column({
        type: DataType.UUID,
    })
    university_id: string;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @BelongsTo(() => University, {foreignKey: "university_id"})
    university: University 
}