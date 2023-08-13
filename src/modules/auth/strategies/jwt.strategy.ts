import * as dotenv from 'dotenv'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { PrismaService } from '../../prisma/services/prisma.service';

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: JwtPayloadDto) {
    let isValid: boolean = false;
    
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.id
        }
      });

      if (user) {
        isValid = true;
      }

    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }

    return isValid;
  }
}