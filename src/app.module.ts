import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PublicationModule } from './modules/publication/publication.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './modules/logger/logger.module';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  UserModule, 
  PublicationModule, 
  AuthModule, 
  LoggerModule,
  DatabaseModule
],
  controllers: [],
  providers: [],
})
export class AppModule { }
