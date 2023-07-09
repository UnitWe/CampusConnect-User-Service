import { Module } from '@nestjs/common';
import { S3Service } from './services/s3.service';
import { S3Controller } from './controllers/s3.controller';
import { UserModule } from '../../../modules/user/user.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [UserModule, MulterModule],
  providers: [S3Service],
  controllers: [S3Controller],
  exports: [S3Service]
})
export class S3Module {}
