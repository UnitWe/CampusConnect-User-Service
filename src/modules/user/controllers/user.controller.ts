import {
  Controller,
  Get,
  Logger,
  Next,
  Patch,
  Post,
  Put,
  Req,
  Res,
  Body,
  Param
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { hashPassword } from '../../../utils/common';
import { Public } from '../../auth/decorators/auth.decorator';
import { UserDto } from '../dto/user.dto';

@Controller('user')
export class UserController {
  logger: Logger;

  constructor(private readonly userService: UserService) {
    this.logger = new Logger();
  }

  @Get()
  async show(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const usersData = await this.userService.findAll();
    return res.status(200).send(usersData);
  }

  @Public()
  @Post(':username/show')
  async showOneByUsername(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const username: string = req.params.username;

    const usersData = await this.userService.findOneByUsername(username);
    return res.status(200).send(usersData);
  }

  @Public()
  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const body: UserDto = req.body;

    const userData = await this.userService.create(body);

    return res.status(201).send({
      statusCode: 200,
      message: 'Usuário cadastrado com sucesso!',
    });
  }

  @Put(':id/update')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Next() nest: NextFunction,
  ) {
    const userId = req.params.id;

    await this.userService.update(userId, req.body);

    return res.status(200).send({
      statusCode: 200,
      message: 'Usuário atualizado com sucesso!',
    });
  }

  @Patch(':id/update/password')
  async updatePassword(
    @Req() req: Request,
    @Res() res: Response,
    @Next() nest: NextFunction,
  ) {
    const userId = req.params.id

    const { newPassword, oldPassword } = req.body

    await this.userService.updatePassword(userId, oldPassword, newPassword);

    return res.status(200).send({
      statusCode: 200,
      message: 'Senha atualizada com sucesso!',
    });
  }
}
