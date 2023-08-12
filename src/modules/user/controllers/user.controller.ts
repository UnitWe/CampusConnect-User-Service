import { Body, Controller,Get, HttpException, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserCreateResponseDto } from '../dto/user-create-response.dto';
import { UserUpdatePasswordDto } from '../dto/user-update-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async showAll() {
    return await this.userService.findAll()
  }

  @Get(":username")
  async showOneByUsername(@Param("username") username: string) {
    return await this.userService.findOneByUsername(username)
  }

  @Post()
  async create(@Body() userData: UserCreateDto): Promise<UserCreateResponseDto> {
    return await this.userService.create(userData);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() userUpdateData: UserUpdateDto){
    await this.userService.update(id, userUpdateData)
    return {status: 200, message: "Usuário atualizado com sucesso!"}
  }

  @Patch(":id/password")
  async updatePassword(@Param("id") id: string, @Body() userUpdatePasswordData: UserUpdatePasswordDto) {
    await this.userService.updatePassword(id, userUpdatePasswordData)
    return {status: 200, message: "Senha atualizada com sucesso!"}
  }
}
