import {
  IsAlphanumeric,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class UserCreateDto {
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  name: string;

  @IsString()
  biograph: string;

  @IsString()
  graduation_course: string;

  @IsIn(['Graduando', 'Graduado', 'Mestre', 'Doutor', 'Phd'])
  @IsString()
  academic_level: string;

  @IsNumber()
  year_conclusion: number;

  @IsUrl()
  @IsString()
  link: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  university_id: string;
}
