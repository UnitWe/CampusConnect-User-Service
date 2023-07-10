import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { University } from '../model/university.model';
import { UniversityDto } from '../dto/university.dto';
import { WhereOptions } from 'sequelize';
import { UNIVERSITY_REPOSITORY } from '../constants';

@Injectable()
export class UniversityService {
  constructor(
    @Inject(UNIVERSITY_REPOSITORY)
    private readonly universityModel: typeof University,
  ) {}

  async findAll(whereStatement?: WhereOptions<University>): Promise<University[]> {
    const universityData = await this.universityModel.findAll({
      where: whereStatement,
    });

    if (!(universityData.length > 0))
      throw new NotFoundException('No university was found!');

    return universityData;
  }

  async findOne(whereStatement: WhereOptions<University>): Promise<University> {
    try {
        const universityData = await this.universityModel.findOne({
          where: whereStatement,
        });

        return universityData;
    } catch (error) {
        throw new NotFoundException('No university was found!');
    }      
  }
  
  async create(university: UniversityDto): Promise<University>{
    if(!university.name || !university.cnpj || !university.abbreviation)
        throw new BadRequestException('Imcomplete body to create university!')
    
    const universityNameAlreadyExists = await this.universityModel.findOne({ where: { name: university.name }})
    if(universityNameAlreadyExists)
        throw new BadRequestException('A university already exists with this name!')

    const universityCnpjAlreadyExists = await this.universityModel.findOne({ where: { cnpj: university.cnpj }})
    if(universityCnpjAlreadyExists)
        throw new BadRequestException('A university already exists with this cnpj!')
    
    const universityAbbreviationAlreadyExists = await this.universityModel.findOne({ where: { abbreviation: university.abbreviation }})
    if(universityAbbreviationAlreadyExists)
        throw new BadRequestException('A university already exists with this abbreviation!')
    
    return await this.universityModel.create(university);
  }
}
