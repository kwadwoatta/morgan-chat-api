import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { documents, notes } from 'src/drizzle/schema';
import { EditDocumentDto } from './dto/edit-Document.dto';

@Injectable()
export class DocumentService {
  constructor(private drizzle: DrizzleService) {}

  uploadDocument(noteId: string, file: Express.Multer.File) {
    return { noteId, file };
  }

  editDocument(noteId: string, DocumentId: string, dto: EditDocumentDto) {
    return this.drizzle.db
      .update(documents)
      .set({
        noteId: noteId,
        ...dto,
      })
      .where(and(eq(notes.id, noteId), eq(documents.id, DocumentId)))
      .returning();
  }

  getDocuments(noteId: string) {
    return this.drizzle.db
      .select()
      .from(documents)
      .where(and(eq(notes.id, noteId)));
  }

  getDocumentById(noteId: string, DocumentId: string) {
    return this.drizzle.db
      .select()
      .from(documents)
      .where(and(eq(notes.id, noteId), eq(documents.id, DocumentId)));
  }

  deleteDocument(noteId: string, DocumentId: string) {
    return this.drizzle.db
      .delete(documents)
      .where(and(eq(notes.id, noteId), eq(documents.id, DocumentId)));
    // .returning({ id: Documents.id });
  }
}
