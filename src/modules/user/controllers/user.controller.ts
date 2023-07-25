import { Controller,Get, Patch, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async show() {
  }

  @Get()
  async showOneByUsername() {
  }

  @Post()
  async create() {
  }

  @Put(':id/update')
  async update() {
  }

  @Patch(':id/update/password')
  async updatePassword() {

  }
}
