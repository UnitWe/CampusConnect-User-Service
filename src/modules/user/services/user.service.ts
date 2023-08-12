import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserCreateDto } from '../dto/user-create.dto';
import { checkPassword, hashPassword } from '../../../utils/common';
import { PrismaService } from '../../../modules/prisma/services/prisma.service';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserCreateResponseDto } from '../dto/user-create-response.dto';
import { UserUpdatePasswordDto } from '../dto/user-update-password.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    const usersData = await this.prismaService.user.findMany({
      select:{
        id: true,
        active: true,
        username: true,
        name: true,
        biograph: true,
        graduation_course: true,
        academic_level: true,
        year_conclusion: true,
        link: true,
        email: true,
        university_id: true,
        createdAt: true,
        updatedAt: true,
      }      
    })
    
    return usersData
  }
  
  async findOneById(id: string) {
    const userData = await this.prismaService.user.findUnique({ where:{ id }, include: { university: true } })

    if(!userData)
      throw new NotFoundException(`Não foi possível encontrar um usuário com este id!`)

    const {password, ...result} = userData;

    return result
  }

  async findOneByEmail(email: string) {
    const userData = await this.prismaService.user.findUnique({ where:{ email },include: { university: true } })

    if(!userData)
      throw new NotFoundException(`Não foi possível encontrar um usuário com o email ${email}!`)

    const {password, ...result} = userData;

    return result
  }

  async findOneByUsername(username: string) {
    const userData = await this.prismaService.user.findUnique({ where:{ username }, include: { university: true } })

    if(!userData)
      throw new NotFoundException(`Não foi possível encontrar um usuário com o apelido ${username}!`)

    const {password, ...result} = userData;

    return result
  }

  async create(user: UserCreateDto): Promise<UserCreateResponseDto>{
    const unhashedPasword = user.password
    delete user.password

    const hashedPassword = await hashPassword(unhashedPasword);

    const userData = await this.prismaService.user.create({
      data: {
        ...user,
        password: hashedPassword
      },
    });

    const { password, ...result } = userData

    return result
  }

  async update(id: string, user: UserUpdateDto) {
    const userData = await this.prismaService.user.update({
      where: { id },
      data: user,
    });

    if(!userData)
      throw new NotFoundException(`Não foi possível encontrar um usuário com este id!`)

    return
  }


  async updatePassword(id: string, userUpdatePasswordData: UserUpdatePasswordDto) {    
    const userData = await this.prismaService.user.findUnique({ where:{ id } })    

    if(!userData)
      throw new NotFoundException(`Não foi possível encontrar um usuário com este id!`)
    
    if(!await checkPassword(userUpdatePasswordData.old_password, userData.password))
      throw new UnauthorizedException(`Senha inserida inválida!`)

    const updatedPasswordHashed = await hashPassword(userUpdatePasswordData.new_password)
    
    await this.prismaService.user.update({where: { id }, data: { password: updatedPasswordHashed }})

    return
  }
}
