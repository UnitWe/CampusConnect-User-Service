import { Module } from '@nestjs/common';
import { UniversityController } from './controllers/university.controller';
import { UniversityService } from './services/university.service';
import { universityProvider } from './providers/university.provider';

@Module({
  controllers: [UniversityController],
  providers: [
    UniversityService,
    ...universityProvider
  ]
})
export class UniversityModule {}
