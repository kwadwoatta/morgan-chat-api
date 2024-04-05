import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateNotebookDto, EditNotebookDto } from './dto';
import { NotebookService } from './notebook.service';
import { ValidateUUIDPipe } from './pipe/validate-uuid.pipe';

@UseGuards(JwtGuard)
@Controller('notebooks')
export class NotebookController {
  constructor(private notebookService: NotebookService) {}

  @Post()
  createNote(@GetUser('id') userId: string, @Body() dto: CreateNotebookDto) {
    return this.notebookService.createNotebook(userId, dto);
  }

  @Patch(':notebookId')
  editNote(
    @GetUser('id') userId: string,
    @Param('notebookId', new ValidateUUIDPipe()) notebookId: string,
    @Body() dto: EditNotebookDto,
  ) {
    return this.notebookService.editNotebook(userId, notebookId, dto);
  }

  @Get()
  getNotes(@GetUser('id') userId: string) {
    return this.notebookService.getNotebooks(userId);
  }

  @Get(':notebookId')
  getNoteById(
    @GetUser('id') userId: string,
    @Param('notebookId', new ValidateUUIDPipe()) notebookId: string,
  ) {
    return this.notebookService.getNotebookById(userId, notebookId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':notebookId')
  deleteNote(
    @GetUser('id') userId: string,
    @Param('notebookId', new ValidateUUIDPipe()) notebookId: string,
  ) {
    return this.notebookService.deleteNotebook(userId, notebookId);
  }
}
