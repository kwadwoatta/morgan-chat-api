import { Provider } from '@nestjs/common';
import { PgClientService } from 'apps/gateway/src/pgclient/pgclient.service';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider: Provider = {
  provide: DrizzleAsyncProvider,
  inject: [PgClientService],
  useFactory: async ({ vectorStore }: PgClientService) => {
    // await client.connect();
    const db = drizzle(vectorStore.client, { schema });
    return db;
  },
};
