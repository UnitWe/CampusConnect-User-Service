import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../modules/prisma/services/prisma.service';
import { UniversityCreateDto } from '../dto/university-create.dto';

@Injectable()
export class UniversityService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    const universityData = await this.prismaService.university.findMany();
    return universityData;
  }

  async findOne(id: string) {
    const universityData = await this.prismaService.university.findUnique({
      where: { id },
    });

    if(!universityData)
      throw new NotFoundException("Nenhuma universidade com esse id foi encontrada!")

    return universityData;
  }

  async create(universityCreateData: UniversityCreateDto) {
    const universityData = await this.prismaService.university.create({ data: universityCreateData })

    return universityData
  }
}
