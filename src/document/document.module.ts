import { Module } from '@nestjs/common';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/upload.service';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [UploadModule],
  providers: [DocumentService, UploadService],
  controllers: [DocumentController],
})
export class DocumentModule {}
