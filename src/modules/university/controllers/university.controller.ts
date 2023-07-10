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
import { NextFunction, Request, Response } from 'express';
import { UniversityService } from '../services/university.service';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Get()
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return res.status(200).send(await this.universityService.findAll());
  }

  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return res
      .status(200)
      .send(await this.universityService.findOne({ id: req.params.id }));
  }

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const { name, cnpj, abbreviation } = req.body;

    return res
      .status(201)
      .send(await this.universityService.create({ name, cnpj, abbreviation }));
  }
}
