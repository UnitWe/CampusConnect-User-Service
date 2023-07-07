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
import { PublicationService } from '../services/publication.service';
import { UserService } from '../../user/services/user.service';

@Controller('publication')
export class PublicationController {
  logger: Logger;

  constructor(
    private readonly publicationService: PublicationService,
    private readonly userService: UserService,
  ) {
    this.logger = new Logger();
  }

  @Get()
  async show(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const publicationsData = await this.publicationService.findAll();

      if (!(publicationsData.length > 0)) {
        return res.status(404).send({
          statusCode: 404,
          message: 'Não foi encontrado nenhum registro de publicação!',
        });
      }

      return res.status(200).send(publicationsData);
    } catch (error) {
      this.logger.error({ message: error });
      return res.status(500).send({
        statusCode: 500,
        message: 'Erro interno no servidor',
      });
    }
  }

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { title, sub_title, body, user_id } = req.body;

      if (!title || !body || !user_id) {
        return res.status(400).send({
          statusCode: 400,
          message: 'Corpo da requisição incompleto!',
        });
      }

      const publicationData = await this.publicationService.create({
        title,
        sub_title,
        body,
        user_id,
      });
      
      return res.status(200).send(publicationData);
    } catch (error) {
      this.logger.error({ message: error });
      return res.status(500).send({
        statusCode: 500,
        message: 'Erro interno no servidor',
      });
    }
  }

  @Put(':id/update')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const publicationId = req.params.id;

      const publicationExists = await this.publicationService.findOneById(
        publicationId,
      );

      if (!publicationExists) {
        return res.status(400).send({
          statusCode: 400,
          message: 'Nenhum usuário com esse id foi encontrado!',
        });
      }

      await this.publicationService.update(publicationId, req.body);

      return res.status(200).send({
        statusCode: 200,
        message: 'Publicação atualizada com sucesso!',
      });
    } catch (error) {
      this.logger.error({ message: error });
      return res.status(500).send({
        statusCode: 500,
        message: 'Erro interno no servidor',
      });
    }
  }

  @Get(':id/user')
  async findAllPublicaitionsByUserId(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const userId = req.params.id;

      const userExists = this.userService.findOneById(userId);

      if (!userExists) {
        return res.status(400).send({
          statusCode: 400,
          message: 'Nenhum usuário com esse id foi encontrado!',
        });
      }

      const publicationsData =
        await this.publicationService.findAllPublicationsByUserId(userId);

      return res.status(200).send(publicationsData);
    } catch (error) {
      this.logger.error({ message: error });
      return res.status(500).send({
        statusCode: 500,
        message: 'Erro interno no servidor',
      });
    }
  }
}
