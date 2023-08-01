import { Controller,Get, Patch, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserCreateDto } from '../dto/user-create.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  async show() {
  }

  async showOneByUsername() {
  }

  @EventPattern('user_create')
  async handleUserCreate(@Payload() userData: UserCreateDto) {
    this.userService.create(userData);
  }

  async update() {
  }

  async updatePassword() {

  }
}
