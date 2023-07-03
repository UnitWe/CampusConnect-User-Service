import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../core/jwt/configs/jwt.config';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        JwtModule.registerAsync(jwtConfig),
        UserModule
    ],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
