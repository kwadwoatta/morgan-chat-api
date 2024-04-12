import {
  EMBEDDING_SERVICE_NAME,
  EmbeddingServiceClient,
  QUEUE_EMBED,
} from '@app/common';
import { Processor } from '@nestjs/bullmq';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Job } from 'bullmq';
import { eq } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import { documents } from '../drizzle/schema';
import { QUEUE_EMBED_OPS } from './enums/queue-embed.enum';
import { QueueEmbedJob } from './interface/job.interface';
import { WorkerHostProcessor } from './worker-host.processor';

@Injectable()
@Processor(QUEUE_EMBED)
export class QueueEmbedProcessor
  extends WorkerHostProcessor
  implements OnModuleInit
{
  private embeddingService: EmbeddingServiceClient;

  constructor(
    @Inject(EMBEDDING_SERVICE_NAME) private clientGrpc: ClientGrpc,
    private drizzle: DrizzleService,
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
      case QUEUE_EMBED_OPS.ADD:
        {
          const { file, documentId } = job.data;

          const embedding$ = this.embeddingService.embedDocument({
            filename: file.originalname,
            content: file.buffer,
          });

          console.log('updating document now');

          embedding$.subscribe(({ content, values: embedding }) => {
            this.drizzle.db
              .update(documents)
              .set({
                embeddingState: 'success',
                content,
                embedding,
              })
              .where(eq(documents.id, documentId));
          });
        }
        break;

      default:
        break;
    }
  }
}
