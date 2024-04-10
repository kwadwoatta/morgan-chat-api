import {
  DistanceStrategy,
  PGVectorStore,
} from '@langchain/community/vectorstores/pgvector';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { PoolConfig } from 'pg';
import * as schema from './../apps/gateway/src/drizzle/schema';

async function main() {
  console.log({ env: process.env });

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

  const db = drizzle(pgVectorStore.client, { schema });

  console.log('migration started ...');

  await migrate(db, { migrationsFolder: 'db/migrations' });

  console.log('migration ended ...');

  await pgVectorStore.end();
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(0);
});
