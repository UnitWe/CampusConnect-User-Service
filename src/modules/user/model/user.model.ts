import { HasMany, Column, CreatedAt, DataType, Model, Table, UpdatedAt, PrimaryKey, Default } from "sequelize-typescript";

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
        allowNull: false,
        values: ['Undergraduate', 'Graduate', 'Master', 'Doctor', 'Phd']
    })
    academic_level: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
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

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}