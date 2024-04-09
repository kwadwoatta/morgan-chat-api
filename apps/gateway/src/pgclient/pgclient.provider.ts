import {
  DistanceStrategy,
  PGVectorStore,
} from '@langchain/community/vectorstores/pgvector';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Provider } from '@nestjs/common';
import { PoolConfig } from 'pg';
// import { Client } from 'pg';

export const PgAsyncProvider = 'PgAsyncProvider';

export const PgClientProvider: Provider = {
  useFactory: async () => {
    // const client = new Client({
    //   connectionString: process.env.DB_URL,
    // });
    const config = {
      postgresConnectionOptions: {
        connectionString: process.env.DB_URL,
      } as PoolConfig,
      tableName: 'morganchat',
      columns: {
        idColumnName: 'id',
        vectorColumnName: 'vector',
        contentColumnName: 'content',
        metadataColumnName: 'metadata',
      },
      // supported distance strategies: cosine (default), innerProduct, or euclidean
      distanceStrategy: 'cosine' as DistanceStrategy,
    };

    const pgVectorStore = await PGVectorStore.initialize(
      new GoogleGenerativeAIEmbeddings(),
      config,
    );

    return pgVectorStore;
  },
  provide: PgAsyncProvider,
};
