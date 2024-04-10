import {
  AI_PACKAGE_NAME,
  EMBEDDING_SERVICE_NAME,
  Embedding,
  EmbeddingServiceClient,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { DrizzleService } from 'apps/gateway/src/drizzle/drizzle.service';
import { documents } from 'apps/gateway/src/drizzle/schema';
import { UploadService } from 'apps/gateway/src/upload/upload.service';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class DocumentService implements OnModuleInit {
  private embeddingService: EmbeddingServiceClient;

  constructor(
    private drizzle: DrizzleService,
    private readonly uploadService: UploadService,
    @Inject(AI_PACKAGE_NAME) private clientGrpc: ClientGrpc,
  ) {}

  onModuleInit() {
    this.embeddingService = this.clientGrpc.getService<EmbeddingServiceClient>(
      EMBEDDING_SERVICE_NAME,
    );
  }

  // async uploadDocument(
  //   userId: string,
  //   notebookId: string,
  //   files: Array<Express.Multer.File>,
  // ) {
  //   return this.uploadService.upload(
  //     files.map(({ originalname, buffer }) => ({
  //       key: `user:${userId}/note:${notebookId}/filename:${originalname}`,
  //       file: buffer,
  //     })),
  //   );
  // }

  async create(userId: string, notebookId: string, file: Express.Multer.File) {
    const observable = await this.embeddingService.embedDocument({
      filename: file.originalname,
      content: file.buffer,
    });

    let embedding: Embedding;

    await observable.forEach((e) => {
      embedding = e;
    });

    return this.drizzle.db
      .insert(documents)
      .values({
        embedding: embedding.values,
        content: embedding.content,
        name: file.originalname,
        embeddingState: 'success',
        notebookId: notebookId,
      })
      .returning();
  }

  async getDocuments(userId: string, notebookId: string) {
    return this.drizzle.db
      .select()
      .from(documents)
      .where(and(eq(documents.notebookId, notebookId)));
  }

  getDocumentById(notebookId: string, documentId: string) {
    return this.drizzle.db
      .select()
      .from(documents)
      .where(
        and(eq(documents.notebookId, notebookId), eq(documents.id, documentId)),
      );
  }

  deleteDocument(notebookId: string, documentId: string) {
    return this.drizzle.db
      .delete(documents)
      .where(
        and(eq(documents.notebookId, notebookId), eq(documents.id, documentId)),
      )
      .returning({ id: documents.id });
  }
}
