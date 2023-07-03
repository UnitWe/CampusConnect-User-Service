import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PublicationModule } from './modules/publication/publication.module';
import { AuthModule } from './modules/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModule } from './modules/logger/logger.module';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  UserModule, 
  PublicationModule, 
  AuthModule, 
  LoggerModule,
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [],
  }), DatabaseModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
