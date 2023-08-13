import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
dotenv.config()

export const jwtConfig = {
    useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        singOptions: {
            expiresIn: configService.get('JWT_EXPIRATION')
        }
    }),
    inject: [ConfigService]
}