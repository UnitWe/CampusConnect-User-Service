import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { User } from '../model/user.model';
import { UserDto } from '../dto/user.dto';
import { USER_REPOSITORY } from '../constants';
import { checkPassword, hashPassword } from '../../../utils/common';
import { WhereOptions } from 'sequelize';
import { S3Service } from '../../../core/aws/s3/services/s3.service';
import { University } from '../../../modules/university/model/university.model';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Injectable()
export class UserService {
  logger: Logger;
  constructor(
    @Inject(USER_REPOSITORY) private userModel: typeof User,
    @Inject(forwardRef(() => S3Service)) private readonly s3Service: S3Service,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService
    ) {
    this.logger = new Logger();
  }

  async findAll(whereStatement?: WhereOptions): Promise<User[]> {
    let userData: User[];

    try {
      userData = await this.userModel.findAll<User>({
        where: whereStatement,
        attributes: {
          exclude: ['password'],
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Internal Server Error: ${error.message}`,
      );
    }

    if (!(userData.length > 0)) throw new NotFoundException('No users found!');

    return userData;
  }

  async create(user: UserDto): Promise<{}> {
    if (
      !user.username ||
      !user.password ||
      !user.email 
    ) {
      throw new BadRequestException(
        `The body of the requisition is not complete!`,
      );
    }

    const userEmailAlreadyExists = await this.userModel.findOne({
      where: { email: user.email },
    });

    if (userEmailAlreadyExists)
      throw new BadRequestException(`A user with this email already exists!`);

    const usernameAlreadyExists = await this.userModel.findOne({
      where: { username: user.username },
    });

    if (usernameAlreadyExists)
      throw new BadRequestException(
        `A user with this username already exists!`,
      );

    const hashedPassword = await hashPassword(user.password);

    try {

      const userData = await this.userModel.create<User>({
        name: user.name,
        biograph: user.biograph,
        graduation_course: user.graduation_course,
        academic_level: user.academic_level,
        year_conclusion: user.year_conclusion,
        university_id: user.university_id,
        link: user.link,
        username: user.username,
        password: hashedPassword,
        email: user.email,
      });

      const token = await this.authService.login(userData)

      return {
        ...userData.dataValues,
        access_token: token.access_token
      }

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        `Internal Server Error: ${error.message}`,
      );
    }
  }

  async update(id: string, user: UserDto): Promise<[number]> {
    const userExists = await this.userModel.findByPk(id);

    if (!userExists)
      throw new NotFoundException('No user found with this id!');

    try {
      return await this.userModel.update<User>(user, {
        where: { id: id },
        fields: [
          'name',
          'biograph',
          'graduation_course',
          'academic_level',
          'university_id',
          'year_conclusion',
          'link',
        ],
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        `Internal Server Error: ${error.message}`,
      );
    }
  }

  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const userData = await this.userModel.findByPk(userId);

    if (!userData)
      throw new NotFoundException('No user found with this id!');

    if (!checkPassword(oldPassword, userData.password))
      throw new BadRequestException('Wrong password!');

    const hashedNewPassword = await hashPassword(newPassword);

    try {
      return await this.userModel.update<User>(
        { password: hashedNewPassword },
        { where: { id: userId }, fields: ['password'] },
      );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        `Internal Server Error: ${error.message}`,
      );
    }
  }

  async findOneById(id: string): Promise<User> {
    return await this.userModel.findOne<User>({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne<User>({ where: { email } });
  }

  async findOneByUsername(username: string){
    const userData = await this.userModel.findOne<User>({ where: { username }, attributes: { exclude: ["password"] } });
    
    if(!userData){
      throw new NotFoundException('Nenhum usuário com esse apelido foi encontrado!')
    }

    const picUrl = await this.s3Service.getProfilePicUrl(userData.id)
    
    return {
      ...userData.dataValues,
      pic_url: picUrl
    };
  }
}
