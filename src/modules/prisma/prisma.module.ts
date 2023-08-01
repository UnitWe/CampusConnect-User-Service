import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
