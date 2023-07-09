import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({freezeTableName: true})
export class University extends Model<University>{
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
        type: DataType.STRING(60)
    })
    name: string;

    @Column({
        type: DataType.STRING(10)
    })
    abbreviation: string;

    @Column({
        type: DataType.STRING
    })
    cnpj: string
}