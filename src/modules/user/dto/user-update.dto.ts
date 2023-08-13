import { PartialType } from '@nestjs/mapped-types';
import { UserCreateDto } from './user-create.dto';
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
import { AcademicLevel } from '@prisma/client';
import { RecordExists } from '../../../decorators/record-exists.decorator';

export class UserUpdateDto extends PartialType(UserCreateDto) {
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

    @IsOptional()
    @RecordExists({model: "university", propertyName:"id"}, { message:"Não foi possível encontrar uma universidade com este id!" })
    @IsString()
    university_id?: never;
}
