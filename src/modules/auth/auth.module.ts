import * as dotenv from 'dotenv'
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthController } from './controllers/auth.controller';
dotenv.config()

@Module({
  imports: [ 
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION}
    }),
  ],
  controllers:[
    AuthController
  ],
  providers: [ 
    AuthService, 
    JwtStrategy ,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
  exports: [ AuthService ],
})
export class AuthModule {}
