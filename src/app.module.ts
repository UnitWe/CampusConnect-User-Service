import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UniversityModule } from './modules/university/university.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    UniversityModule,
    PrismaModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
