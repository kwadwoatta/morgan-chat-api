import {
  EMBEDDING_SERVICE_NAME,
  EmbeddingServiceClient,
  QUEUE_EMBED,
} from '@app/common';
import { Processor } from '@nestjs/bullmq';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Job } from 'bullmq';
import { eq, sql } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import { documents, embeddings } from '../drizzle/schema';
import { WorkerHostProcessor } from '../queue/worker-host.processor';
import { QUEUE_EMBED_OPS } from './enums/queue-embed.enum';
import { QueueEmbedJob } from './interface/job.interface';

@Injectable()
@Processor(QUEUE_EMBED)
export class QueueEmbedProcessor
  extends WorkerHostProcessor
  implements OnModuleInit
{
  private embeddingService: EmbeddingServiceClient;

  constructor(
    @Inject(EMBEDDING_SERVICE_NAME) private clientGrpc: ClientGrpc,
    private readonly drizzle: DrizzleService,
  ) {
    super();
  }

  onModuleInit() {
    this.embeddingService = this.clientGrpc.getService<EmbeddingServiceClient>(
      EMBEDDING_SERVICE_NAME,
    );
  }

  async process(job: Job<QueueEmbedJob, any, string>): Promise<any> {
    switch (job.name) {
      case QUEUE_EMBED_OPS.ADD: {
        const { file, documentId } = job.data;

        try {
          const embedding$ = this.embeddingService.embedDocument({
            filename: file.originalname,
            contentAsUint8Array: Buffer.from(file.buffer),
          });

          embedding$.subscribe(({ embeddedDocuments }) => {
            this.drizzle.db.transaction(async (tx) => {
              embeddedDocuments.map(
                async ({ embedding, metadata, pageContent }) => {
                  await tx.insert(embeddings).values({
                    documentId,
                    embedding: embedding,
                    content: pageContent,
                    metadata: sql`${JSON.stringify(metadata)}::jsonb`, // or ::jsonb
                  });
                },
              );

              await tx
                .update(documents)
                .set({ embeddingState: 'success', updatedAt: new Date() })
                .where(eq(documents.id, documentId));
            });
          });
        } catch (error) {
          throw new BadRequestException(JSON.stringify(error));
        }
      }
    }
  }
}
