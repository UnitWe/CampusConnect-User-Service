import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../model/user.model';
import { UserDto } from '../dto/user.dto';
import { USER_REPOSITORY } from '../constants';
import { hashPassword } from '../../../utils/common';

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
    try {
      if(!user.username || !user.password || !user.email || !user.academic_level || !user.year_conclusion){
        throw new BadRequestException(`The body of the requisition is not complete!`)
      }

      const userEmailAlreadyExists = await this.userModel.findOne({ where: { email: user.email}})
      
      if(userEmailAlreadyExists){
        throw new BadRequestException(`A user with this email already exists!`)
      }

      const usernameAlreadyExists = await this.userModel.findOne({ where: { username: user.username}})

      if(usernameAlreadyExists){
        throw new BadRequestException(`A user with this username already exists!`)
      }

      const hashedPassword = await hashPassword(user.password)

      return await this.userModel.create<User>({
        name: user.name,
        biograph: user.biograph,
        graduation_course: user.graduation_course,
        academic_level: user.academic_level,
        year_conclusion: user.year_conclusion,
        link: user.link,
        username: user.username,
        password: hashedPassword,
        email: user.email
      });
    } catch (error) {
      throw new InternalServerErrorException(`Internal Server Error: ${error.message}`);
    }
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
