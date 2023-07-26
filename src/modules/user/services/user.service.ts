import { Injectable } from '@nestjs/common';
import { UserCreateDto } from '../dto/user-create.dto';
import { checkPassword, hashPassword } from '../../../utils/common';

@Injectable()
export class UserService {
  constructor() {

  }

  async findAll(){

  }

  async create(user: UserCreateDto){

  }

  async update(id: string, user){

  }

  async updatePassword() {
  }

  async findOneById(id: string){
  }

  async findOneByEmail(email: string){

  }

  async findOneByUsername(username: string){

  }
}
