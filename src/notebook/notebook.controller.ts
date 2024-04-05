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

@UseGuards(JwtGuard)
@Controller('notebooks')
export class NotebookController {
  constructor(private noteService: NotebookService) {}

  @Post()
  createNote(@GetUser('id') userId: string, @Body() dto: CreateNotebookDto) {
    return this.noteService.createNote(userId, dto);
  }

  @Patch(':notebookId')
  editNote(
    @GetUser('id') userId: string,
    @Param('notebookId') notebookId: string,
    @Body() dto: EditNotebookDto,
  ) {
    return this.noteService.editNote(userId, notebookId, dto);
  }

  @Get()
  getNotes(@GetUser('id') userId: string) {
    return this.noteService.getNotes(userId);
  }

  @Get(':notebookId')
  getNoteById(
    @GetUser('id') userId: string,
    @Param('notebookId') notebookId: string,
  ) {
    return this.noteService.getNoteById(userId, notebookId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':notebookId')
  deleteNote(
    @GetUser('id') userId: string,
    @Param('notebookId') notebookId: string,
  ) {
    return this.noteService.deleteNote(userId, notebookId);
  }
}
