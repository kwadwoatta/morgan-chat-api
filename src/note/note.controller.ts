import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('notes')
export class NoteController {
  @Post()
  createNote() {}

  @Get()
  getNotes() {}

  @Get()
  getNoteById() {}

  @Patch()
  updateNote() {}

  @Delete()
  deleteNote() {}
}
