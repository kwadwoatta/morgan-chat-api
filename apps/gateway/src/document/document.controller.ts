import { ValidateUUIDPipe } from '@app/common/pipe';
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
import { GetUser } from 'apps/gateway/src/auth/decorator';
import { JwtGuard } from 'apps/gateway/src/auth/guard';
import { GetNotebook } from '../notebook/decorator/get-notebook.decorator';
import { Notebook } from '../notebook/entities';
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
    @GetNotebook() notebook: Notebook,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10_000_000 }),
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.documentService.create(userId, notebook.id, file);
  }

  @Get()
  getDocuments(
    @GetUser('id') userId: string,
    @GetNotebook() notebook: Notebook,
  ) {
    return this.documentService.getDocuments(userId, notebook.id);
  }

  @Get(':documentId')
  getDocumentById(
    @GetNotebook() notebook,
    @Param('documentId', ValidateUUIDPipe) documentId: string,
  ) {
    return this.documentService.getDocumentById(notebook.id, documentId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':documentId')
  deleteDocument(
    @GetNotebook() notebook: Notebook,
    @Param('documentId', ValidateUUIDPipe) documentId: string,
  ) {
    return this.documentService.deleteDocument(notebook.id, documentId);
  }
}
