import { IsNotEmpty, IsString } from "class-validator"
import { RecordAlreadyExists } from "../../../modules/decorators/record-already-exists.decorator"

export class UniversityCreateDto {
    @RecordAlreadyExists("university")
    @IsString()
    @IsNotEmpty()
    name: string

    @RecordAlreadyExists("university")
    @IsString()
    @IsNotEmpty()
    abbreviation: string

    @RecordAlreadyExists("university")
    @IsString()
    @IsNotEmpty()
    cnpj: string
}