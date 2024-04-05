import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { DocumentService } from './document.service';

@UseGuards(JwtGuard)
@Controller('notebooks/:notebookId/documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @GetUser('id') userId: string,
    @Param('notebookId') notebookId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    await this.documentService.uploadDocument(userId, notebookId, files);
  }

  @Get()
  getDocuments(
    @GetUser('id') userId: string,
    @Param('notebookId') notebookId: string,
  ) {
    return this.documentService.getDocuments(userId, notebookId);
  }

  @Get(':documentId')
  getDocumentById(
    @GetUser('id') userId: string,
    @Param('notebookId') notebookId: string,
    @Param('documentId') documentId: string,
  ) {
    return this.documentService.getDocumentById(userId, documentId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':documentId')
  deleteDocument(
    @GetUser('id') userId: string,
    @Param('notebookId') notebookId: string,
    @Param('documentId') documentId: string,
  ) {
    return this.documentService.deleteDocument(userId, documentId);
  }
}
