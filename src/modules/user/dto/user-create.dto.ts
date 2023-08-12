import { AcademicLevel } from '@prisma/client';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { RecordAlreadyExists } from '../../../modules/decorators/record-already-exists.decorator';

export class UserCreateDto {
  @RecordAlreadyExists("user", { message: "Este apelido já existe nos registros!" })
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  biograph?: string;

  @IsOptional()
  @IsString()
  graduation_course?: string;

  @IsOptional()
  @IsIn(['Graduando', 'Graduado', 'Mestre', 'Doutor', 'Phd'])
  @IsString()
  academic_level?: AcademicLevel;

  @IsOptional()
  @IsNumber()
  year_conclusion?: number;

  @IsOptional()
  @IsUrl()
  @IsString()
  link?: string;

  @RecordAlreadyExists("user", { message: "Este Email já existe nos registros!" })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  university_id?: never;
}
