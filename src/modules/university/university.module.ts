import { Module } from '@nestjs/common';
import { UniversityController } from './controllers/university.controller';
import { UniversityService } from './services/university.service';

@Module({
  controllers: [UniversityController],
  providers: [
    UniversityService,
  ]
})
export class UniversityModule {}
