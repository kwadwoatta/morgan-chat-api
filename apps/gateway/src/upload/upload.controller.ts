import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'apps/gateway/src/auth/decorator';
import { UploadService } from './upload.service';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(
    @GetUser('id') userId,
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
    await this.uploadService.upload(
      files.map(({ originalname, buffer }) => ({
        key: `${userId}/${originalname}`,
        file: buffer,
      })),
    );
  }
}
