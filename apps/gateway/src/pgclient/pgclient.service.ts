import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { Inject, Injectable } from '@nestjs/common';
import { PgAsyncProvider } from './pgclient.provider';

@Injectable()
export class PgClientService {
  constructor(@Inject(PgAsyncProvider) readonly vectorStore: PGVectorStore) {}
}
