import { Inject, Injectable, Logger } from '@nestjs/common';
import { User } from '../model/user.model';
import { UserDto } from '../dto/user.dto';
import { USER_REPOSITORY } from '../constants';

@Injectable()
export class UserService {
  logger: Logger;
  constructor(@Inject(USER_REPOSITORY) private userModel: typeof User) {
    this.logger = new Logger();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll<User>({
      attributes: {
        exclude: ["password"]
      }
    });
  }

  async create(user: UserDto): Promise<User> {
    return await this.userModel.create<User>(user);
  }

  async update(id: string, user: UserDto): Promise<[number]> {
    return await this.userModel.update<User>(user, { where: { id: id } });
  }

  async findOneById(id: string): Promise<User> {
    return await this.userModel.findOne<User>({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne<User>({ where: { email } });
  }

  async findOneByUsername(username: string): Promise<User>{
    return await this.userModel.findOne<User>({where: { username }});
  }
}
