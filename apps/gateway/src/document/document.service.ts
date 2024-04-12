import { QUEUE_EMBED } from '@app/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'apps/gateway/src/drizzle/drizzle.service';
import { documents } from 'apps/gateway/src/drizzle/schema';
import { Queue } from 'bullmq';
import { and, eq } from 'drizzle-orm';
import { QUEUE_EMBED_OPS } from '../queue-embed/enums/queue-embed.enum';
import { QueueEmbedJob } from '../queue-embed/interface/job.interface';

@Injectable()
export class DocumentService {
  constructor(
    private drizzle: DrizzleService,
    @InjectQueue(QUEUE_EMBED)
    private embedQueue: Queue<QueueEmbedJob>,
  ) {}

  async create(userId: string, notebookId: string, file: Express.Multer.File) {
    const docs = await this.drizzle.db
      .insert(documents)
      .values({
        name: file.originalname,
        embeddingState: 'pending',
        notebookId: notebookId,
      })
      .returning();

    this.embedQueue.add(QUEUE_EMBED_OPS.ADD, {
      file,
      userId,
      notebookId,
      documentId: docs[0].id,
    });
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
