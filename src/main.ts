import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { PrismaNotFoundExceptionFilter } from './modules/exception-filter/prisma-not-found.exception-filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
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

  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422,
  }))

  app.enableCors()

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new PrismaNotFoundExceptionFilter());

  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}

bootstrap();
