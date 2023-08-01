import { Inject, Injectable } from '@nestjs/common';
import { UserCreateDto } from '../dto/user-create.dto';
import { checkPassword, hashPassword } from '../../../utils/common';
import { PrismaService } from '../../../modules/prisma/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {}

  async create(user: UserCreateDto) {
    const userData = await this.prismaService.user.create({
      data: {
        ...user,
      },
    });
  }

  async update(id: string, user) {}

  async updatePassword() {}

  async findOneById(id: string) {}

  async findOneByEmail(email: string) {}

  async findOneByUsername(username: string) {}
}
