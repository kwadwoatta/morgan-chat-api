import { AI_PACKAGE_NAME } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AiModule } from './ai.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AiModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../ai.proto'),
        package: AI_PACKAGE_NAME,
        maxReceiveMessageLength: 100_000_000,
        maxSendMessageLength: 100_000_000,
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen();
}
bootstrap();
