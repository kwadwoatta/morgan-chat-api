import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'apps/gateway/src/drizzle/drizzle.service';
import { notebooks } from 'apps/gateway/src/drizzle/schema';
import { and, eq } from 'drizzle-orm';
import { CreateNotebookDto, EditNotebookDto } from './dto';

@Injectable()
export class NotebookService {
  constructor(private drizzle: DrizzleService) {}

  createNotebook(userId: string, dto: CreateNotebookDto) {
    return this.drizzle.db
      .insert(notebooks)
      .values({
        authorId: userId,
        ...dto,
      })
      .returning();
  }

  editNotebook(userId: string, notebookId: string, dto: EditNotebookDto) {
    return this.drizzle.db
      .update(notebooks)
      .set({
        ...dto,
      })
      .where(and(eq(notebooks.authorId, userId), eq(notebooks.id, notebookId)))
      .returning();
  }

  getNotebooks(userId: string) {
    return this.drizzle.db
      .select()
      .from(notebooks)
      .where(and(eq(notebooks.authorId, userId)));
  }

  getNotebookById(userId: string, notebookId: string) {
    return this.drizzle.db
      .select()
      .from(notebooks)
      .where(and(eq(notebooks.authorId, userId), eq(notebooks.id, notebookId)));
  }

  deleteNotebook(userId: string, notebookId: string) {
    return this.drizzle.db
      .delete(notebooks)
      .where(and(eq(notebooks.authorId, userId), eq(notebooks.id, notebookId)));
  }
}
