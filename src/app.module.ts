import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './core/database/database.module';
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { S3Module } from './core/aws/s3/s3.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  UserModule, 
  AuthModule,
  DatabaseModule,
  S3Module
],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
 }
