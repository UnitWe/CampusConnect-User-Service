import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UniversityService } from '../services/university.service';
import { UniversityCreateDto } from '../dto/university-create.dto';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Get()
  async findAll() {
    return await this.universityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.universityService.findOne(id);
  }

  @Post()
  async create(@Body() universityCreateData: UniversityCreateDto) {
    return await this.universityService.create(universityCreateData);
  }
}
