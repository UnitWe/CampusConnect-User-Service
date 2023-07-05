import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PublicationModule } from './modules/publication/publication.module';
import { DatabaseModule } from './core/database/database.module';
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  UserModule, 
  PublicationModule, 
  DatabaseModule
],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
 }
