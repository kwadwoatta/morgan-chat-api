import { AI_PACKAGE_NAME } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UploadModule } from 'apps/gateway/src/upload/upload.module';
import { UploadService } from 'apps/gateway/src/upload/upload.service';
import { join } from 'path';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [
    UploadModule,
    ClientsModule.register([
      {
        name: AI_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AI_PACKAGE_NAME,
          protoPath: join(__dirname, '../ai.proto'),
          maxSendMessageLength: 10_000_000,
          maxReceiveMessageLength: 10_000_000,
        },
      },
    ]),
  ],
  providers: [DocumentService, UploadService],
  controllers: [DocumentController],
})
export class DocumentModule {}
