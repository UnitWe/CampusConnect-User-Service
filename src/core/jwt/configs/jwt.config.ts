import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
dotenv.config()

export const jwtConfig = {
    useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        singOptions: {
            expiresIn: configService.get('JWT_EXP_H')
        }
    }),
    inject: [ConfigService]
}