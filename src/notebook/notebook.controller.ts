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
@Controller('notes')
export class NotebookController {
  constructor(private noteService: NotebookService) {}

  @Post()
  createNote(@GetUser('id') userId: string, @Body() dto: CreateNotebookDto) {
    return this.noteService.createNote(userId, dto);
  }

  @Patch(':noteId')
  editNote(
    @GetUser('id') userId: string,
    @Param('noteId') noteId: string,
    @Body() dto: EditNotebookDto,
  ) {
    return this.noteService.editNote(userId, noteId, dto);
  }

  @Get()
  getNotes(@GetUser('id') userId: string) {
    return this.noteService.getNotes(userId);
  }

  @Get(':noteId')
  getNoteById(@GetUser('id') userId: string, @Param('noteId') noteId: string) {
    return this.noteService.getNoteById(userId, noteId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':noteId')
  deleteNote(@GetUser('id') userId: string, @Param('noteId') noteId: string) {
    return this.noteService.deleteNote(userId, noteId);
  }
}
