import {
  AI_PACKAGE_NAME,
  EMBEDDING_SERVICE_NAME,
  QUEUE_EMBED,
} from '@app/common';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { QueueEmbedProcessor } from '../queue-embed/queue-embed.processor';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EMBEDDING_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AI_PACKAGE_NAME,
          protoPath: join(__dirname, '../ai.proto'),
          maxSendMessageLength: 100_000_000,
          maxReceiveMessageLength: 100_000_000,
        },
      },
    ]),
    BullModule.registerQueue({
      name: QUEUE_EMBED,
    }),
  ],
  providers: [DocumentService, QueueEmbedProcessor],
  controllers: [DocumentController],
})
export class DocumentModule {}
