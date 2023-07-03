import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../jwt/configs/jwt.config';

@Module({
    imports: [
        JwtModule.registerAsync(jwtConfig),
    ]
})
export class AuthModule {}
