import {
  Controller,
  Get,
  Logger,
  Next,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UniversityService } from '../services/university.service';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Get()
  async findAll() {

  }
  
  @Get(':id')
  async findOne() {

  }

  @Post()
  async create() {
    
  }
}
