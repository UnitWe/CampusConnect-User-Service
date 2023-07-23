import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';

import { UniversityModule } from './modules/university/university.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  UserModule, 
  UniversityModule,
],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
 }
