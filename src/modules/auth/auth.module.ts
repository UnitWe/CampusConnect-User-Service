import * as dotenv from 'dotenv'
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthController } from './controllers/auth.controler';
import { S3Module } from '../../core/aws/s3/s3.module';

dotenv.config()

@Module({
  imports: [ 
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE}
    }),
    S3Module
  ],
  controllers:[
    AuthController
  ],
  providers: [ AuthService, LocalStrategy, JwtStrategy ,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
  exports: [ AuthService ],
})
export class AuthModule {}
