import { Inject, Injectable, Logger } from '@nestjs/common';
import { PUBLICATION_REPOSITORY } from '../constants';
import { Publication } from '../model/publication.model';
import { PublicationDto } from '../dto/publication.dto';
import { Comment } from '../../comment/model/comment.model';

@Injectable()
export class PublicationService {
  logger: Logger;
  constructor(
    @Inject(PUBLICATION_REPOSITORY)
    private publicationModel: typeof Publication,
  ) {
    this.logger = new Logger();
  }

  async findAll(): Promise<Publication[]> {
    return await this.publicationModel.findAll<Publication>({
      include:{
        model: Comment,
        as: "comments",
        attributes: {
          exclude: ["id", "publication_id"]
        }
      }
    });
  }

  async create(publication: PublicationDto): Promise<Publication> {
    return await this.publicationModel.create<Publication>(publication);
  }

  async update(id: string, publication: PublicationDto): Promise<[number]> {
    return await this.publicationModel.update<Publication>(publication, {
      where: { id },
    });
  }

  async findOneById(id: string): Promise<Publication>{
    return await this.publicationModel.findOne<Publication>({ where: { id }});
  }

  async findAllPublicationsByUserId(user_id: string): Promise<Publication[]>{
    return await this.publicationModel.findAll<Publication>({ where: { user_id }})
  }
}
