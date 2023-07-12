import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetObjectCommand, PutObjectAclCommandOutput, PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 } from 'uuid';
import { UserService } from '../../../../modules/user/services/user.service';

@Injectable()
export class S3Service {
  public readonly s3: S3Client;

  constructor(@Inject(forwardRef(() => UserService)) private readonly userService: UserService, private configService: ConfigService) {
    this.s3 = new S3Client  ({
      credentials: {
        accessKeyId: configService.get("AWS_ACCESS_KEY"),
        secretAccessKey: configService.get("AWS_SECRET_ACCESS_KEY"),
      },
      region: configService.get("AWS_SERVER"),
    });
  }

  async uploadProfilePic(
    bufferData: Buffer,
    user_id: string,
  ): Promise<PutObjectAclCommandOutput> {
    const imageId = v4();
    let uploadResult: PutObjectAclCommandOutput;

    const userData = await this.userService.findOneById(user_id);

    if (!userData) {
      throw new NotFoundException(
        'No User found!',
      );
    }

    const imageParams: PutObjectCommandInput = {
      Bucket: `${this.configService.get("AWS_BUCKET_NAME")}`,
      Body: bufferData,
      Key: `pictures/profile/${userData.username}/${imageId}.webp`,
      ContentType: 'webp',
    }

    try {
      const command = new PutObjectCommand(imageParams)
      uploadResult = await this.s3.send(command)

      userData.update({
        picture_bucket_id: imageId
      }, {
        fields: ["picture_bucket_id"]
      })
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Um erro ocorreu ao dar upload na imagem!',
      );
    }

    return uploadResult;
  }

  async getProfilePicUrl(user_id: string): Promise<string>{
    const userData = await this.userService.findOneById(user_id);

    if (!userData) {
      throw new NotFoundException(
        'No User found!',
      );
    }

    if(!userData.picture_bucket_id){
      return null;
    }

    const getObjectParams ={
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `pictures/profile/${userData.username}/${userData.picture_bucket_id}.webp`
    }

    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(this.s3, command, {expiresIn: 3600})

    return url
  }
}
