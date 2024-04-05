import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { notebooks, users } from 'src/drizzle/schema';
import { CreateNotebookDto, EditNotebookDto } from './dto';

@Injectable()
export class NotebookService {
  constructor(private drizzle: DrizzleService) {}

  createNote(userId: string, dto: CreateNotebookDto) {
    return this.drizzle.db
      .insert(notebooks)
      .values({
        authorId: userId,
        ...dto,
      })
      .returning();
  }

  editNote(userId: string, notebookId: string, dto: EditNotebookDto) {
    return this.drizzle.db
      .update(notebooks)
      .set({
        authorId: userId,
        ...dto,
      })
      .where(and(eq(users.id, userId), eq(notebooks.id, notebookId)))
      .returning();
  }

  getNotes(userId: string) {
    return this.drizzle.db
      .select()
      .from(notebooks)
      .where(and(eq(users.id, userId)));
  }

  getNoteById(userId: string, notebookId: string) {
    return this.drizzle.db
      .select()
      .from(notebooks)
      .where(and(eq(users.id, userId), eq(notebooks.id, notebookId)));
  }

  deleteNote(userId: string, notebookId: string) {
    return this.drizzle.db
      .delete(notebooks)
      .where(and(eq(users.id, userId), eq(notebooks.id, notebookId)));
    // .returning({ id: notebooks.id });
  }
}
