import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PublicationModule } from './modules/publication/publication.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [UserModule, PublicationModule, AuthModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
