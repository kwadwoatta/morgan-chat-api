import { AI_PACKAGE_NAME } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { QueueEmbedProcessor } from '../queue-embed/queue-embed.processor';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AI_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AI_PACKAGE_NAME,
          protoPath: join(__dirname, '../ai.proto'),
          maxSendMessageLength: 10_000_000,
          maxReceiveMessageLength: 10_000_000,
          url: process.env.GRPC_URL,
        },
      },
    ]),
  ],
  providers: [QueueEmbedProcessor],
  exports: [QueueEmbedProcessor],
})
export class QueueEmbedModule {}
