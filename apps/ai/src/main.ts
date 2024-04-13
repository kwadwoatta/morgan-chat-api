import { AI_PACKAGE_NAME } from '@app/common';
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
        maxReceiveMessageLength: 10_000_000,
        maxSendMessageLength: 10_000_000,
      },
    },
  );

  await app.listen();
}
bootstrap();
