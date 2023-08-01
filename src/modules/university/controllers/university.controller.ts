import { Controller, Get, Post } from '@nestjs/common';
import { UniversityService } from '../services/university.service';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  async findAll() {}

  async findOne() {}

  async create() {}
}
