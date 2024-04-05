import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { documents, notes } from 'src/drizzle/schema';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class DocumentService {
  constructor(
    private drizzle: DrizzleService,
    private readonly uploadService: UploadService,
  ) {}

  async uploadDocument(
    userId: string,
    noteId: string,
    files: Array<Express.Multer.File>,
  ) {
    return this.uploadService.upload(
      files.map(({ originalname, buffer }) => ({
        key: `user:${userId}/note:${noteId}/filename:${originalname}`,
        file: buffer,
      })),
    );
  }

  // async editDocument(noteId: string, documentId: string, dto: EditDocumentDto) {
  //   return this.drizzle.db
  //     .update(documents)
  //     .set({
  //       ...dto,
  //     })
  //     .where(and(eq(notes.id, noteId), eq(documents.id, documentId)))
  //     .returning();
  // }

  async getDocuments(userId: string, noteId: string) {
    await this.uploadService.getAllFiles(`user:${userId}/note:${noteId}/`);

    return this.drizzle.db
      .select()
      .from(documents)
      .where(and(eq(notes.id, noteId)));
  }

  getDocumentById(noteId: string, documentId: string) {
    return this.drizzle.db
      .select()
      .from(documents)
      .where(and(eq(notes.id, noteId), eq(documents.id, documentId)));
  }

  deleteDocument(noteId: string, documentId: string) {
    return this.drizzle.db
      .delete(documents)
      .where(and(eq(notes.id, noteId), eq(documents.id, documentId)));
    // .returning({ id: Documents.id });
  }
}
