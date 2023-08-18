import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from '../../../utils/common';
import { LoginDto } from '../dto/login.dto';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email
      }
    });    

    if (user && await checkPassword(pass, user.password)) {
      const { id, name, username, email } = user;

      return {id, name, username, email};
    }

    throw new UnauthorizedException(
      'Email e/ou Senha inválido(s)!',
    );
  }

  async login(loginBody: LoginDto) {    
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginBody.email
      }
    });

    if (user && await checkPassword(loginBody.password, user.password)) {
      const { id, name, username, email } = user;

      const payload = {
        token: await this.jwtService.signAsync({
          id,
          name,
          username,
          email,
        }),
      }
  
      return payload
    }

    throw new UnauthorizedException(
      'Email e/ou Senha inválido(s)!',
    );
  }
}
