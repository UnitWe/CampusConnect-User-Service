import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { userProvider } from './providers/user.provider';
import { S3Module } from '../../core/aws/s3/s3.module';
@Module({
  imports: [forwardRef(() => S3Module)],
  controllers: [UserController],
providers: [
    UserService,
    ...userProvider
  ],
  exports: [UserService]
})
export class UserModule {}
