import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/decorator';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @GetUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.documentService.uploadDocument(userId, file);
  }

  @Get()
  getDocuments(@GetUser('id') userId: string) {
    return this.documentService.getDocuments(userId);
  }

  @Get(':id')
  getDocumentById(
    @GetUser('id') userId: string,
    @Param('id') DocumentId: string,
  ) {
    return this.documentService.getDocumentById(userId, DocumentId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteDocument(
    @GetUser('id') userId: string,
    @Param('id') DocumentId: string,
  ) {
    return this.documentService.deleteDocument(userId, DocumentId);
  }
}
