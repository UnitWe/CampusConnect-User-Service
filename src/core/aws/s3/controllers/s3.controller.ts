import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { S3Service } from '../services/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { UserService } from '../../../../modules/user/services/user.service';
import { Public } from '../../../../modules/auth/decorators/auth.decorator';

@Controller('profile')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post(':id/upload')
  @Public()
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.s3Service.uploadProfilePic(
      file.buffer,
      req.params.id,
    );

    return res.status(200).send(result);
  }
}
