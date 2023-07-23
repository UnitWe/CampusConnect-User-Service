import { Injectable } from '@nestjs/common';
import { User } from '../model/user.model';
import { checkPassword, hashPassword } from '../../../utils/common';
import { University } from '../../../modules/university/model/university.model';

@Injectable()
export class UserService {
  constructor() {

  }

  async findAll(){

  }

  async create(user){

  }

  async update(id: string, user){

  }

  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {

  }

  async findOneById(id: string){
  }

  async findOneByEmail(email: string){

  }

  async findOneByUsername(username: string){

  }
}
