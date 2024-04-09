import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'apps/gateway/src/drizzle/drizzle.service';
import { documents, notebooks } from 'apps/gateway/src/drizzle/schema';
import { UploadService } from 'apps/gateway/src/upload/upload.service';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class DocumentService {
  constructor(
    private drizzle: DrizzleService,
    private readonly uploadService: UploadService,
  ) {}

  async uploadDocument(
    userId: string,
    notebookId: string,
    files: Array<Express.Multer.File>,
  ) {
    return this.uploadService.upload(
      files.map(({ originalname, buffer }) => ({
        key: `user:${userId}/note:${notebookId}/filename:${originalname}`,
        file: buffer,
      })),
    );
  }

  // async editDocument(notebookId: string, documentId: string, dto: EditDocumentDto) {
  //   return this.drizzle.db
  //     .update(documents)
  //     .set({
  //       ...dto,
  //     })
  //     .where(and(eq(notebooks.id, notebookId), eq(documents.id, documentId)))
  //     .returning();
  // }

  async getDocuments(userId: string, notebookId: string) {
    await this.uploadService.getAllFiles(`user:${userId}/note:${notebookId}/`);

    return this.drizzle.db
      .select()
      .from(documents)
      .leftJoin(notebooks, eq(notebooks.id, notebookId))
      .where(and(eq(notebooks.id, notebookId)));
  }

  getDocumentById(notebookId: string, documentId: string) {
    return this.drizzle.db
      .select()
      .from(documents)
      .leftJoin(notebooks, eq(notebooks.id, notebookId))
      .where(and(eq(notebooks.id, notebookId), eq(documents.id, documentId)));
  }

  deleteDocument(notebookId: string, documentId: string) {
    return this.drizzle.db
      .delete(documents)
      .where(and(eq(notebooks.id, notebookId), eq(documents.id, documentId)));
    // .returning({ id: Documents.id });
  }
}