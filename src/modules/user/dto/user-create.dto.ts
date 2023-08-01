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

export class UserCreateDto {
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
