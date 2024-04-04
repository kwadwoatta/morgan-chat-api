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
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { CreateNoteDto } from './dto/create-note.dto';
import { EditNoteDto } from './dto/edit-note.dto';
import { NoteService } from './note.service';

@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post()
  createNote(@GetUser('id') userId: string, @Body() dto: CreateNoteDto) {
    return this.noteService.createNote(userId, dto);
  }

  @Patch(':id')
  editNote(
    @GetUser('id') userId: string,
    @Param('id') noteId: string,
    @Body() dto: EditNoteDto,
  ) {
    return this.noteService.editNote(userId, noteId, dto);
  }

  @Get()
  getNotes(@GetUser('id') userId: string) {
    return this.noteService.getNotes(userId);
  }

  @Get(':id')
  getNoteById(@GetUser('id') userId: string, @Param('id') noteId: string) {
    return this.noteService.getNoteById(userId, noteId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteNote(@GetUser('id') userId: string, @Param('id') noteId: string) {
    return this.noteService.deleteNote(userId, noteId);
  }
}
