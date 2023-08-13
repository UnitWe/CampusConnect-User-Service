import { IsNotEmpty, IsString } from "class-validator"

export class UserUpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    old_password: string
    
    @IsString()
    @IsNotEmpty()
    new_password: string
}