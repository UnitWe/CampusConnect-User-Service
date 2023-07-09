import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';

dotenv.config;

@Injectable()
export class S3Service {
  public readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SERCRET_ACCESS_KEY,
      region: process.env.AWS_SERVER,
    });
  }

  async uploadProfilePic(bufferData: Buffer, username: string): Promise<S3.ManagedUpload.SendData> {
    try {
      const uploadResult = await this.s3.upload({
        Bucket: `${process.env.AWS_BUCKET_NAME}`,
        Body: bufferData,
        Key: `pictures/profile/${username}/${v4()}.webp`,
        ContentDisposition: 'inline'
      }).promise()

      return uploadResult
    } catch (error) {
      console.log(error);
    }
  }
}
