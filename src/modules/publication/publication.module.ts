import { Module } from '@nestjs/common';
import { PublicationService } from './services/publication.service';
import { PublicationController } from './controllers/publication.controller';
import { publicationProvider } from './providers/publication.provider';
import { UserModule } from '../user/user.module';

@Module({
  imports:[UserModule],
  controllers: [PublicationController],
  providers: [
    PublicationService,
    ...publicationProvider
  ],
  exports: [PublicationService]
})
export class PublicationModule {}
