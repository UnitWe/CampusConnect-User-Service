import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['host.docker.internal:9094'],
      },
      consumer: {
        groupId: 'users-consumer',
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}

bootstrap();
