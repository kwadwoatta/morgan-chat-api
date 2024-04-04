import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { notes, users } from 'src/drizzle/schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { EditNoteDto } from './dto/edit-note.dto';

@Injectable()
export class NoteService {
  constructor(private drizzle: DrizzleService) {}

  createNote(userId: string, dto: CreateNoteDto) {
    return this.drizzle.db
      .insert(notes)
      .values({
        authorId: userId,
        ...dto,
      })
      .returning();
  }

  editNote(userId: string, noteId: string, dto: EditNoteDto) {
    return this.drizzle.db
      .update(notes)
      .set({
        authorId: userId,
        ...dto,
      })
      .where(and(eq(users.id, userId), eq(notes.id, noteId)))
      .returning();
  }

  getNotes(userId: string) {
    return this.drizzle.db
      .select()
      .from(notes)
      .where(and(eq(users.id, userId)));
  }

  getNoteById(userId: string, noteId: string) {
    return this.drizzle.db
      .select()
      .from(notes)
      .where(and(eq(users.id, userId), eq(notes.id, noteId)));
  }

  deleteNote(userId: string, noteId: string) {
    return this.drizzle.db
      .delete(notes)
      .where(and(eq(users.id, userId), eq(notes.id, noteId)));
    // .returning({ id: notes.id });
  }
}
