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
import { PublicationService } from '../../publication/services/publication.service';
import { UserService } from '../../user/services/user.service';
import { NextFunction, Request, Response } from 'express';
import { CommentService } from '../services/comment.service';

@Controller('comment')
export class CommentController {
  logger: Logger;

  constructor(
    private readonly publicationService: PublicationService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {
    this.logger = new Logger();
  }

  @Get(':id/publication')
  async findAllCommentsByPublicationId(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const publicationId = req.params.id;

      const publicationExists =
        this.publicationService.findOneById(publicationId);

      if (!publicationExists) {
        return res.status(400).send({
          statusCode: 400,
          message: 'Nenhuma publiação com esse id foi encontrado!',
        });
      }

      const commentsData = await this.commentService.findAllByPublicationId(
        publicationId,
      );

      return res.status(200).send(commentsData);
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
      const { body, user_id, publication_id } = req.body;

      if (!body || !user_id || !publication_id) {
        return res.status(400).send({
          statusCode: 400,
          message: 'Corpo da requisição incompleto!',
        });
      }

      const publicationExists = this.publicationService.findOneById(publication_id);

      if (!publicationExists) {
        return res.status(400).send({
          statusCode: 400,
          message: 'Nenhuma publiação com esse id foi encontrado!',
        });
      }

      const userExists = this.userService.findOneById(user_id);

      if (!userExists) {
        return res.status(400).send({
          statusCode: 400,
          message: 'Nenhum usuário com esse id foi encontrado!',
        });
      }

      const commentData = await this.commentService.create({
        body,
        user_id,
        publication_id,
      });

      res.status(200).send(commentData);
    } catch (error) {
      this.logger.error({ message: error });
      return res.status(500).send({
        statusCode: 500,
        message: 'Erro interno no servidor',
      });
    }
  }
}
